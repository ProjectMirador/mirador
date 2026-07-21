import { useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * Used to request or exit fullscreen using the native Fullscreen API.
 */
export function useFullScreenHandle() {
  const [active, setActive] = useState(false);

  /**  */
  const handleFullScreenChange = () => {
    setActive(document.fullscreenElement === document.body);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  /**  */
  const requestFullscreen = () => document.body.requestFullscreen();

  const enter = useCallback(() => {
    if (document.fullscreenElement) {
      return document.exitFullscreen().then(() => requestFullscreen());
    }
    return requestFullscreen();
  }, []);

  const exit = useCallback(() => {
    if (document.fullscreenElement !== document.body) return Promise.resolve();
    return document.exitFullscreen();
  }, []);

  return useMemo(
    () => ({
      active,
      enter,
      exit,
    }),
    [active, enter, exit],
  );
}

/**
 * Used to set its children to fullscreen.
 */
export const FullScreen = ({ handle, onChange = undefined, children = null, className = '' }) => {
  const fullScreenClasses = ['fullscreen', className, handle.active ? 'fullscreen-enabled' : ''].filter(Boolean);

  useEffect(() => {
    if (onChange) {
      onChange(handle.active, handle);
    }
  }, [handle, handle.active, onChange]);

  const styles = handle.active
    ? {
        height: '100%',
        width: '100%',
      }
    : {};

  return (
    <div className={fullScreenClasses.join(' ')} style={styles}>
      {children}
    </div>
  );
};

FullScreen.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  handle: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};
