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
      companionWindowDimensions,
      focused,
      layout,
      workspace,
      updateElasticWindowLayout,
    } = this.props;

    const offsetX = workspace.width / 2;
    const offsetY = workspace.height / 2;

    return (
      <Rnd
        key={`${layout.windowId}-${workspace.id}`}
        size={{
          height: layout.height + companionWindowDimensions.height,
          width: layout.width + companionWindowDimensions.width,
        }}
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
            height: ref.style.height - companionWindowDimensions.height,
            width: ref.style.width - companionWindowDimensions.width,
            x: position.x - offsetX,
            y: position.y - offsetY,
          });
        }}
        dragHandleClassName={ns('window-top-bar')}
        className={
          focused ? ns('workspace-focused-window') : null
        }
      >
        <Window
          windowId={layout.windowId}
        />
      </Rnd>
    );
  }
}

WorkspaceElasticWindow.propTypes = {
  companionWindowDimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  focused: PropTypes.bool,
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

WorkspaceElasticWindow.defaultProps = {
  companionWindowDimensions: { height: 0, width: 0 },
  focused: false,
};

export default WorkspaceElasticWindow;
