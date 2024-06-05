import {
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import fscreen from 'fscreen';

/**
 * Used to request or exit fullscreen using the Fullscreen API, normalized
 * using fscreen.
 */
export function useFullScreenHandle() {
  const [active, setActive] = useState(false);

  /**  */
  const handleFullScreenChange = () => {
    setActive(fscreen.fullscreenElement === document.body);
  };

  useEffect(() => {
    fscreen.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => fscreen.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  /**  */
  const requestFullscreen = () => fscreen.requestFullscreen(document.body);

  const enter = useCallback(() => {
    if (fscreen.fullscreenElement) {
      return fscreen.exitFullscreen()
        .then(() => requestFullscreen());
    }
    return requestFullscreen();
  }, []);

  const exit = useCallback(() => {
    if (fscreen.fullscreenElement !== document.body) return Promise.resolve();
    return fscreen.exitFullscreen();
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
export const FullScreen = ({
  handle,
  onChange,
  children,
  className = '',
}) => {
  const fullScreenClasses = ['fullscreen', className, handle.active ? 'fullscreen-enabled' : ''].filter(Boolean);

  useEffect(() => {
    if (onChange) {
      onChange(handle.active, handle);
    }
  }, [handle, handle.active, onChange]);

  const styles = handle.active ? {
    height: '100%',
    width: '100%',
  } : {};

  return (
    <div className={fullScreenClasses.join(' ')} style={styles}>
      {children}
    </div>
  );
};

FullScreen.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
  handle: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func,
};
FullScreen.defaultProps = {
  children: null,
  onChange: undefined,
};
