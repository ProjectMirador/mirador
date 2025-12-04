import { useState, useCallback } from 'react';
import FailedImageContext from './FailedImageContext';
import config from '../config/settings.js';

export default function FailedImageProvider({ children }) {
  const fallbackImage = config.fallbackImage
  const [failedUrls, setFailedUrls] = useState(new Set());

  const markFailed = useCallback((url) => {
    setFailedUrls((prev) => new Set(prev).add(url));
  }, []);

  const isFailed = useCallback((url) => failedUrls.has(url), [failedUrls]);

  return (
    <FailedImageContext.Provider value={{ markFailed, isFailed, fallbackImage }}>
      {children}
    </FailedImageContext.Provider>
  );
}
