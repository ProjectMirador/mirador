import {
  createContext, useContext, useState, useEffect, forwardRef,
} from 'react';

const WorkspaceContext = createContext({ current: document.body });

/**
 * @returns HOC that injects the workspace ref into the component
 */
export const withWorkspaceContext = (Component) => {
  /**
   * Wrap the component with the context
   */
  function ContextHoc(props, ref) {
    const workspaceContext = useContext(WorkspaceContext);

    const [workspaceRef, setWorkspaceRef] = useState();

    useEffect(() => {
      setWorkspaceRef(workspaceContext);
    }, [workspaceContext]);

    const passDownProps = {
      ...props,
      ...(ref ? { ref } : {}),
    };

    return <Component container={workspaceRef} {...passDownProps} />;
  }

  const whatever = forwardRef(ContextHoc);
  whatever.displayName = `WithWorkspaceContext(${Component.displayName || Component.name || 'Component'})`;
  return whatever;
};

export default WorkspaceContext;
