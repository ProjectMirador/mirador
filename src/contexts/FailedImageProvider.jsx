import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import FailedImageContext from './FailedImageContext';
import config from '../config/settings';

// SVG fallback with Material-UI Warning icon
// Uses default primary blue (#1967d2) - override entire image via config.fallbackImage if needed
const defaultFallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="600"%3E%3Crect width="400" height="600" fill="%23f5f5f5"/%3E%3Cpath d="M 200 240 L 254 354 L 146 354 Z M 200 228 L 128 372 L 272 372 Z M 204.5 336 L 195.5 336 L 195.5 345 L 204.5 345 Z M 204.5 309 L 195.5 309 L 195.5 327 L 204.5 327 Z" fill="%231967d2"/%3E%3C/svg%3E';

export default function FailedImageProvider({ children }) {
  const fallbackImage = config.fallbackImage || defaultFallback;
  const [hasFailed, setHasFailed] = useState(false);

  const notifyFailure = useCallback(() => {
    setHasFailed(true);
  }, []);

  return (
    <FailedImageContext.Provider value={{
      fallbackImage,
      hasFailed,
      notifyFailure,
    }}
    >
      {children}
    </FailedImageContext.Provider>
  );
}

FailedImageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
