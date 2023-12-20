import {
  useContext,
  createContext,
  forwardRef,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

const WindowContext = createContext({ id: null });

/**
 * Set up the window context for a given window; this is
 * done as a HOC so that we can wrap the component
 * at the container in a backwards-compatible way.
 */
export const setWindowContext = (Component) => {
  /**
   * Wrap the component with the context
   */
  function ContextHoc({ windowId, ...props }, ref) {
    const passDownProps = {
      ...props,
      ...(ref ? { ref } : {}),
    };

    const value = useMemo(() => ({ id: windowId }), [windowId]);

    return (
      <WindowContext.Provider value={value}>
        <Component windowId={windowId} {...passDownProps} />
      </WindowContext.Provider>
    );
  }

  ContextHoc.propTypes = {
    windowId: PropTypes.string.isRequired,
  };

  const whatever = forwardRef(ContextHoc);
  whatever.displayName = `WithSetWindowContext(${Component.displayName || Component.name || 'Component'})`;
  return whatever;
};

/**
 * @returns HOC that injects the workspace ref into the component
 */
export const withWindowContext = (Component) => {
  /**
   * Wrap the component with the context
   */
  function ContextHoc({ windowId, ...props }, ref) {
    const { id } = useContext(WindowContext);

    const passDownProps = {
      ...props,
      ...(ref ? { ref } : {}),
    };

    ContextHoc.propTypes = {
      windowId: PropTypes.string,
    };

    ContextHoc.defaultProps = {
      windowId: null,
    };

    return <Component windowId={windowId || id} {...passDownProps} />;
  }

  const whatever = forwardRef(ContextHoc);
  whatever.displayName = `WithWindowContext(${Component.displayName || Component.name || 'Component'})`;
  return whatever;
};

export default WindowContext;
