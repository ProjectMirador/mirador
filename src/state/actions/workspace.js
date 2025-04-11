import ActionTypes from './action-types';

/**
 * updateWorkspace - action creator
 * @param {object} config
 */
export function updateWorkspace(config) {
  return { config, type: ActionTypes.UPDATE_WORKSPACE };
}

/**
 * toggleZoomControls - action creator
 * @param {boolean} showZoomControls
 * @memberof ActionCreators
 */
export function toggleZoomControls(showZoomControls) {
  return { showZoomControls, type: ActionTypes.TOGGLE_ZOOM_CONTROLS };
}

/**
 * updateWorkspaceMosaicLayout - action creator
 * @param  {object} layout
 * @memberof ActionCreators
 */
export function updateWorkspaceMosaicLayout(layout) {
  return { layout, type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT };
}

/**
 * updateWorkspaceMosaicLayout - action creator
 * @param  {object} isWorkspaceAddVisible
 * @memberof ActionCreators
 */
export function setWorkspaceAddVisibility(isWorkspaceAddVisible) {
  return {
    isWorkspaceAddVisible,
    type: ActionTypes.SET_WORKSPACE_ADD_VISIBILITY,
  };
}

/**
 * setWorkspaceViewportPosition - action creator
 * @param {object} position
 * @param {number} position.x
 * @param {number} position.y
 * @memberof ActionCreators
 */
export function setWorkspaceViewportPosition({ x, y }) {
  return {
    payload: {
      position: {
        x,
        y,
      },
    },
    type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
  };
}

/**
 * setWorkspaceViewportDimensions - action creator
 * @param  {object} position
 * @param {number} position.width
 * @param {number} position.height
 * @memberof ActionCreators
 */
export function setWorkspaceViewportDimensions({ width, height }) {
  return {
    payload: {
      position: {
        height,
        width,
      },
    },
    type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
  };
}

/**
 * toggleDraggingEnabled - action creator
 */
export function toggleDraggingEnabled() {
  return {
    type: ActionTypes.TOGGLE_DRAGGING,
  };
}
