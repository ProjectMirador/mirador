import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';
import ns from '../config/css-ns';
import { getWorkspaceBoundingBox } from '../state/selectors';

const minimapContainer = {
  width: 200,
  height: 200,
  innerPadding: 10,
};

// There is a minimum bounding box based on the viewport dimensions,
// and the bounding box is always square

/**
 * ElasticMinimap
 */
const scaledViewport = (workspaceViewport, boundingBox) => {
  const viewportAspectRatio = workspaceViewport.width / workspaceViewport.height;
  const viewportScaleFactor = workspaceViewport.width / boundingBox.width;

  const scaledViewportWidth = viewportScaleFactor * minimapContainer.width;
  const scaledViewportHeight = scaledViewportWidth / viewportAspectRatio;
  const scaledViewportX = (-workspaceViewport.x / boundingBox.width) * minimapContainer.width;
  const scaledViewportY = (-workspaceViewport.y / boundingBox.height) * minimapContainer.height;

  return {
    x: scaledViewportX,
    y: scaledViewportY,
    width: scaledViewportWidth,
    height: scaledViewportHeight,
  };
};

/**
 * ElasticMinimap
 */
const minimapToWorkspaceCoordinates = (x, y, boundingBox) => {
  const newX = -x * boundingBox.width / minimapContainer.width;
  const newY = -y * boundingBox.height / minimapContainer.height;
  return {
    x: newX,
    y: newY,
  };
};

/**
 * ElasticMinimap
 */
const windowStyle = (window, boundingBox) => {
  const windowAspectRatio = window.width / window.height;
  const windowScaleFactor = window.width / boundingBox.width;

  const scaledWindowWidth = windowScaleFactor * 100;
  const scaledWindowX = (window.x / boundingBox.width) * 100;
  const scaledWindowY = (window.y / boundingBox.height) * 100;
  const scaledWindowHeight = scaledWindowWidth / windowAspectRatio;

  return {
    top: `${scaledWindowY}%`,
    left: `${scaledWindowX}%`,
    height: `${scaledWindowHeight}%`,
    width: `${scaledWindowWidth}%`,
  };
};

/**
 * ElasticMinimap
 */
const boundingBoxStyle = (windows, boundingBox) => {
  const windowBoundingBox = getWorkspaceBoundingBox(windows);
  const windowBBAspectRatio = windowBoundingBox.width / windowBoundingBox.height;
  const windowBBScaleFactor = windowBoundingBox.width / boundingBox.width;

  const scaledWindowBBWidth = windowBBScaleFactor * 100;
  const scaledWindowBBX = (windowBoundingBox.x / boundingBox.width) * 100;
  const scaledWindowBBY = (windowBoundingBox.y / boundingBox.height) * 100;
  const scaledWindowBBHeight = scaledWindowBBWidth / windowBBAspectRatio;

  return {
    top: `${scaledWindowBBY}%`,
    left: `${scaledWindowBBX}%`,
    height: `${scaledWindowBBHeight}%`,
    width: `${scaledWindowBBWidth}%`,
  };
};

/**
 * ElasticMinimap
 */
export class ElasticMinimap extends Component {
  /**
   * render
   * @return
   */
  render() {
    const boundingBox = {
      width: 5000,
      height: 5000,
    };

    const {
      windows,
      workspaceViewport,
      setWorkspaceViewportPosition,
    } = this.props;

    const viewport = scaledViewport(
      workspaceViewport,
      boundingBox,
    );

    return (
      <div className={ns('elastic-minimap')}>
        {
          Object.values(windows).map(window => (
            <div
              key={window.id}
              className="minimap-window"
              style={windowStyle(window, boundingBox)}
            />
          ))
        }
        <div
          className="window-bounding-box"
          style={boundingBoxStyle(windows, boundingBox)}
        />
        <Rnd
          position={{ x: viewport.x, y: viewport.y }}
          size={{ width: viewport.width, height: viewport.height }}
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
          onDragStart={(e, d) => null}
          onDrag={(e, d) => {
            const newPosition = minimapToWorkspaceCoordinates(d.x, d.y, boundingBox);
            setWorkspaceViewportPosition(newPosition.x, newPosition.y);
          }}
          className="minimap-viewport"
        />
      </div>
    );
  }
}

ElasticMinimap.propTypes = {
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setWorkspaceViewportPosition: PropTypes.func.isRequired,
  workspaceViewport: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
