import React from 'react';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';
import Window from '../containers/Window';
import ns from '../config/css-ns';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
class WorkspaceElastic extends React.Component {
  /**
   */
  render() {
    const {
      workspace,
      windows,
      setWorkspaceViewportPosition,
      updateWindowPosition,
      setWindowSize,
    } = this.props;
    return (
      <Rnd
        default={{
          width: 5000,
          height: 5000,
        }}
        position={{ x: workspace.viewportPosition.x, y: workspace.viewportPosition.y }}
        enableResizing={{
          top: false,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        onDragStop={(e, d) => {
          setWorkspaceViewportPosition({ x: d.x, y: d.y });
        }}
        cancel={`.${ns('window')}`}
        className={ns('workspace')}
      >
        {
          Object.values(windows).map(window => (
            <Rnd
              key={window.id}
              size={{ width: window.width, height: window.height }}
              position={{ x: window.x, y: window.y }}
              bounds="parent"
              onDragStop={(e, d) => {
                updateWindowPosition(window.id, { x: d.x, y: d.y });
              }}
              onResize={(e, direction, ref, delta, position) => {
                setWindowSize(window.id, {
                  width: ref.style.width,
                  height: ref.style.height,
                  ...position,
                });
              }}
              dragHandleClassName={ns('window-top-bar')}
            >
              <Window
                window={window}
              />
            </Rnd>
          ))
        }
      </Rnd>
    );
  }
}

WorkspaceElastic.propTypes = {
  setWorkspaceViewportPosition: PropTypes.func.isRequired,
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  workspace: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  updateWindowPosition: PropTypes.func.isRequired,
  setWindowSize: PropTypes.func.isRequired,
};

export default WorkspaceElastic;
