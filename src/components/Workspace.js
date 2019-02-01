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
class Workspace extends React.Component {
  /**
   * render
   */
  render() {
    const { workspace, windows, setWorkspaceViewportPosition } = this.props;
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
            <Window
              key={window.id}
              window={window}
            />
          ))
        }
      </Rnd>
    );
  }
}

Workspace.propTypes = {
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  workspace: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setWorkspaceViewportPosition: PropTypes.func.isRequired,
};

export default Workspace;
