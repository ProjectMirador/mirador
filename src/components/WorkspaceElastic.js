import React from 'react';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';
import ResizeObserver from 'react-resize-observer';
import WorkspaceElasticWindow from './WorkspaceElasticWindow';
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
      elasticLayout,
      setWorkspaceViewportDimensions,
      setWorkspaceViewportPosition,
      updateElasticWindowLayout,
    } = this.props;

    const { viewportPosition } = workspace;
    const offsetX = workspace.width / 2;
    const offsetY = workspace.height / 2;

    return (
      <div style={{ height: '100%', position: 'relative', width: '100%' }}>
        <ResizeObserver
          onResize={(rect) => { setWorkspaceViewportDimensions(rect); }}
        />

        <Rnd
          default={{
            height: workspace.height,
            width: workspace.width,
          }}
          position={{
            x: -1 * viewportPosition.x - offsetX, y: -1 * viewportPosition.y - offsetY,
          }}
          enableResizing={{
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            left: false,
            right: false,
            top: false,
            topLeft: false,
            topRight: false,
          }}
          onDragStop={(e, d) => {
            setWorkspaceViewportPosition({ x: -1 * d.x - offsetX, y: -1 * d.y - offsetY });
          }}
          cancel={`.${ns('window')}`}
          className={ns('workspace')}
          disableDragging={!workspace.draggingEnabled}
        >
          {
            Object.values(elasticLayout).map(layout => (
              <WorkspaceElasticWindow
                layout={layout}
                workspace={workspace}
                updateElasticWindowLayout={updateElasticWindowLayout}
              />
            ))
          }
        </Rnd>
      </div>
    );
  }
}

WorkspaceElastic.propTypes = {
  elasticLayout: PropTypes.objectOf(PropTypes.shape({
    height: PropTypes.number,
    id: PropTypes.string,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  })).isRequired,
  setWorkspaceViewportDimensions: PropTypes.func.isRequired,
  setWorkspaceViewportPosition: PropTypes.func.isRequired,
  updateElasticWindowLayout: PropTypes.func.isRequired,
  workspace: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default WorkspaceElastic;
