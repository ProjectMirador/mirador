import PropTypes from 'prop-types';
import { render, screen, waitFor } from '@tests/utils/test-utils';
import useMediaStartTime from '../../../src/hooks/useMediaStartTime';

/** Build an in-memory silent WAV Blob URL of the given duration in seconds */
function createSilentWavUrl(durationSeconds = 120) {
  const sampleRate = 8000;
  const numSamples = sampleRate * durationSeconds;
  const buffer = new ArrayBuffer(44 + numSamples);
  const view = new DataView(buffer);

  const writeString = (offset, str) => {
    for (let i = 0; i < str.length; i += 1) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true); // 8-bit
  writeString(36, 'data');
  view.setUint32(40, numSamples, true);
  new Uint8Array(buffer, 44).fill(128); // 128 = silence in 8-bit unsigned PCM

  return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }));
}

function TestMedia({ src = undefined, startTime = undefined, mediaKey = 'a' }) {
  const mediaRef = useMediaStartTime(startTime, mediaKey);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <audio data-testid="media" key={mediaKey} ref={mediaRef} src={src} preload="metadata" />;
}

TestMedia.propTypes = {
  mediaKey: PropTypes.string,
  src: PropTypes.string,
  startTime: PropTypes.number,
};

describe('useMediaStartTime', () => {
  let wavUrl;

  beforeAll(() => {
    wavUrl = createSilentWavUrl(120);
  });

  afterAll(() => {
    URL.revokeObjectURL(wavUrl);
  });

  it('does nothing when no start time is given', async () => {
    render(<TestMedia src={wavUrl} />);
    const media = screen.getByTestId('media');

    await waitFor(() => expect(media.readyState).toBeGreaterThanOrEqual(media.HAVE_METADATA));
    expect(media.currentTime).toBe(0);
  });

  it('waits for loadedmetadata before seeking', async () => {
    render(<TestMedia src={wavUrl} startTime={30} />);
    const media = screen.getByTestId('media');

    await waitFor(() => expect(media.currentTime).toBe(30));
  });

  it('seeks immediately when the metadata is already loaded', async () => {
    const { rerender } = render(<TestMedia src={wavUrl} />);
    const media = screen.getByTestId('media');

    // Wait for real Chromium metadata load
    await waitFor(() => expect(media.readyState).toBeGreaterThanOrEqual(media.HAVE_METADATA));

    rerender(<TestMedia src={wavUrl} startTime={45} />);
    expect(media.currentTime).toBe(45);
  });

  it('treats a start time of 0 as a seek request', async () => {
    const { rerender } = render(<TestMedia src={wavUrl} startTime={20} />);
    const media = screen.getByTestId('media');

    await waitFor(() => expect(media.currentTime).toBe(20));

    rerender(<TestMedia src={wavUrl} startTime={0} />);
    expect(media.currentTime).toBe(0);
  });

  it('only applies the latest start time if it changes before metadata loads', async () => {
    const { rerender } = render(<TestMedia src={wavUrl} startTime={30} />);
    rerender(<TestMedia src={wavUrl} startTime={60} />);

    const media = screen.getByTestId('media');
    await waitFor(() => expect(media.currentTime).toBe(60));
  });

  it('seeks the new element when the media key changes', async () => {
    const { rerender } = render(<TestMedia src={wavUrl} startTime={30} mediaKey="a" />);
    const oldMedia = screen.getByTestId('media');
    await waitFor(() => expect(oldMedia.currentTime).toBe(30));

    rerender(<TestMedia src={wavUrl} startTime={30} mediaKey="b" />);
    const newMedia = screen.getByTestId('media');

    expect(newMedia).not.toBe(oldMedia);
    await waitFor(() => expect(newMedia.currentTime).toBe(30));
  });

  it('removes its listener on unmount', () => {
    // Render without src first so metadata hasn't loaded yet
    const { unmount } = render(<TestMedia startTime={30} />);
    const media = screen.getByTestId('media');

    unmount();
    media.src = wavUrl;
    media.dispatchEvent(new Event('loadedmetadata'));

    expect(media.currentTime).toBe(0);
  });
});
