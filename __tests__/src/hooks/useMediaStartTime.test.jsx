import PropTypes from 'prop-types';
import { render, screen } from '@tests/utils/test-utils';
import useMediaStartTime from '../../../src/hooks/useMediaStartTime';

/** Minimal component that attaches the hook's ref to an audio element */
function TestMedia({ startTime = undefined, mediaKey = 'a' }) {
  const mediaRef = useMediaStartTime(startTime, mediaKey);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <audio data-testid="media" key={mediaKey} ref={mediaRef} />;
}

TestMedia.propTypes = {
  mediaKey: PropTypes.string,
  startTime: PropTypes.number,
};

/** Record every write to currentTime on the media element */
function spyOnCurrentTime(media) {
  const setter = vi.fn();
  Object.defineProperty(media, 'currentTime', { configurable: true, get: () => 0, set: setter });
  return setter;
}

/** happy-dom never loads media, so fake an element whose metadata has loaded */
function markMetadataLoaded(media) {
  Object.defineProperty(media, 'HAVE_METADATA', { configurable: true, value: 1 });
  Object.defineProperty(media, 'readyState', { configurable: true, value: 1 });
}

describe('useMediaStartTime', () => {
  it('does nothing when no start time is given', () => {
    render(<TestMedia />);
    const media = screen.getByTestId('media');
    const setter = spyOnCurrentTime(media);

    media.dispatchEvent(new Event('loadedmetadata'));

    expect(setter).not.toHaveBeenCalled();
  });

  it('waits for loadedmetadata before seeking', () => {
    render(<TestMedia startTime={30} />);
    const media = screen.getByTestId('media');
    const setter = spyOnCurrentTime(media);

    expect(setter).not.toHaveBeenCalled();

    media.dispatchEvent(new Event('loadedmetadata'));

    expect(setter).toHaveBeenCalledExactlyOnceWith(30);
  });

  it('seeks immediately when the metadata is already loaded', () => {
    const { rerender } = render(<TestMedia />);
    const media = screen.getByTestId('media');
    markMetadataLoaded(media);
    const setter = spyOnCurrentTime(media);

    rerender(<TestMedia startTime={45} />);

    expect(setter).toHaveBeenCalledExactlyOnceWith(45);
  });

  it('treats a start time of 0 as a seek request', () => {
    const { rerender } = render(<TestMedia />);
    const media = screen.getByTestId('media');
    markMetadataLoaded(media);
    const setter = spyOnCurrentTime(media);

    rerender(<TestMedia startTime={0} />);

    expect(setter).toHaveBeenCalledExactlyOnceWith(0);
  });

  it('only applies the latest start time if it changes before metadata loads', () => {
    const { rerender } = render(<TestMedia startTime={30} />);
    const media = screen.getByTestId('media');
    const setter = spyOnCurrentTime(media);

    rerender(<TestMedia startTime={60} />);
    media.dispatchEvent(new Event('loadedmetadata'));

    expect(setter).toHaveBeenCalledExactlyOnceWith(60);
  });

  it('seeks the new element when the media key changes', () => {
    const { rerender } = render(<TestMedia startTime={30} mediaKey="a" />);
    const oldMedia = screen.getByTestId('media');
    const oldSetter = spyOnCurrentTime(oldMedia);

    rerender(<TestMedia startTime={30} mediaKey="b" />);
    const newMedia = screen.getByTestId('media');
    const newSetter = spyOnCurrentTime(newMedia);

    expect(newMedia).not.toBe(oldMedia);

    oldMedia.dispatchEvent(new Event('loadedmetadata'));
    newMedia.dispatchEvent(new Event('loadedmetadata'));

    expect(oldSetter).not.toHaveBeenCalled();
    expect(newSetter).toHaveBeenCalledExactlyOnceWith(30);
  });

  it('removes its listener on unmount', () => {
    const { unmount } = render(<TestMedia startTime={30} />);
    const media = screen.getByTestId('media');
    const setter = spyOnCurrentTime(media);

    unmount();
    media.dispatchEvent(new Event('loadedmetadata'));

    expect(setter).not.toHaveBeenCalled();
  });
});
