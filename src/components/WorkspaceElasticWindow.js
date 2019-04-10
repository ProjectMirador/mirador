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
class WorkspaceElasticWindow extends React.Component {
  /**
   */
  render() {
    const {
      layout,
      workspace,
      updateElasticWindowLayout,
    } = this.props;

    const offsetX = workspace.width / 2;
    const offsetY = workspace.height / 2;

    return (
      <Rnd
        key={`${layout.windowId}-${workspace.id}`}
        size={{ height: layout.height, width: layout.width }}
        position={{ x: layout.x + offsetX, y: layout.y + offsetY }}
        bounds="parent"
        onDragStop={(e, d) => {
          updateElasticWindowLayout(
            layout.windowId,
            { x: d.x - offsetX, y: d.y - offsetY },
          );
        }}
        onResize={(e, direction, ref, delta, position) => {
          updateElasticWindowLayout(layout.windowId, {
            height: ref.style.height,
            width: ref.style.width,
            x: position.x - offsetX,
            y: position.y - offsetY,
          });
        }}
        dragHandleClassName={ns('window-top-bar')}
        className={
          workspace.focusedWindowId === layout.windowId ? ns('workspace-focused-window') : null
        }
      >
        <Window
          window={window}
        />
      </Rnd>
    );
  }
}

WorkspaceElasticWindow.propTypes = {
  layout: PropTypes.shape({
    height: PropTypes.number,
    id: PropTypes.string,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  updateElasticWindowLayout: PropTypes.func.isRequired,
  workspace: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default WorkspaceElasticWindow;
