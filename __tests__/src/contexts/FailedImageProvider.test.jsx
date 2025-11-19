import { act } from '@tests/utils/test-utils';
import { renderHook } from '@testing-library/react';
import { useContext } from 'react';
import FailedImageProvider from '../../../src/contexts/FailedImageProvider';
import FailedImageContext from '../../../src/contexts/FailedImageContext';
import config from '../../../src/config/settings.js';

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

  it('provides undefined if config.fallbackImage is not set', () => {
    config.fallbackImage = undefined;

    const wrapper = ({ children }) => <FailedImageProvider>{children}</FailedImageProvider>;
    const { result } = renderHook(() => useContext(FailedImageContext), { wrapper });

    expect(result.current.fallbackImage).toBeUndefined();
  });

  it('markFailed adds URLs and isFailed reflects state', () => {
    const wrapper = ({ children }) => <FailedImageProvider>{children}</FailedImageProvider>;
    const { result } = renderHook(() => useContext(FailedImageContext), { wrapper });

    expect(result.current.isFailed('a')).toBe(false);

    act(() => {
      result.current.markFailed('a');
    });

    expect(result.current.isFailed('a')).toBe(true);
  });
});
