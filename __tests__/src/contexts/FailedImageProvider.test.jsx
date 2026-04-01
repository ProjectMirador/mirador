import { act } from '@tests/utils/test-utils';
import { renderHook } from '@testing-library/react';
import { useContext } from 'react';
import FailedImageProvider from '../../../src/contexts/FailedImageProvider';
import FailedImageContext from '../../../src/contexts/FailedImageContext';
import config from '../../../src/config/settings';

describe('FailedImageProvider', () => {
  let originalFallback;

  beforeEach(() => {
    // Save original value
    originalFallback = config.fallbackImage;
  });

  afterEach(() => {
    // Restore original value
    config.fallbackImage = originalFallback;
  });

  it('provides the fallbackImage from config if defined', () => {
    config.fallbackImage = 'http://example.com/config-fallback.jpg';

    const wrapper = ({ children }) => <FailedImageProvider>{children}</FailedImageProvider>;
    const { result } = renderHook(() => useContext(FailedImageContext), { wrapper });

    expect(result.current.fallbackImage).toBe('http://example.com/config-fallback.jpg');
  });

  it('provides the default SVG fallback if config.fallbackImage is not set', () => {
    config.fallbackImage = undefined;

    const wrapper = ({ children }) => <FailedImageProvider>{children}</FailedImageProvider>;
    const { result } = renderHook(() => useContext(FailedImageContext), { wrapper });

    expect(result.current.fallbackImage).toBeDefined();
    // Default is an SVG data URI with warning icon
    expect(result.current.fallbackImage).toContain('data:image/svg+xml');
    expect(result.current.fallbackImage).toContain('%231967d2'); // Blue color
  });

  it('provides failedImages as empty Set initially and can add to it', () => {
    const wrapper = ({ children }) => <FailedImageProvider>{children}</FailedImageProvider>;
    const { result } = renderHook(() => useContext(FailedImageContext), { wrapper });

    expect(result.current.failedImages).toBeInstanceOf(Set);
    expect(result.current.failedImages.size).toBe(0);

    act(() => {
      result.current.notifyFailure('https://example.com/image1.jpg');
    });

    expect(result.current.failedImages.size).toBe(1);
    expect(result.current.failedImages.has('https://example.com/image1.jpg')).toBe(true);
  });
});
