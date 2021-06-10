import ActionTypes from './action-types';
/**
 * updateWorkspace - action creator
 *
 * @param {Object} config
 */

export function updateWorkspace(config) {
  return {
    config: config,
    type: ActionTypes.UPDATE_WORKSPACE
  };
}
/**
 * setWorkspaceFullscreen - action creator
 *
 * @param  {Boolean} isFullscreenEnabled
 * @memberof ActionCreators
 */

export function setWorkspaceFullscreen(isFullscreenEnabled) {
  return {
    isFullscreenEnabled: isFullscreenEnabled,
    type: ActionTypes.SET_WORKSPACE_FULLSCREEN
  };
}
/**
 * toggleZoomControls - action creator
 * @param {Boolean} showZoomControls
 * @memberof ActionCreators
*/

export function toggleZoomControls(showZoomControls) {
  return {
    showZoomControls: showZoomControls,
    type: ActionTypes.TOGGLE_ZOOM_CONTROLS
  };
}
/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} layout
 * @memberof ActionCreators
 */

export function updateWorkspaceMosaicLayout(layout) {
  return {
    layout: layout,
    type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT
  };
}
/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} isWorkspaceAddVisible
 * @memberof ActionCreators
 */

export function setWorkspaceAddVisibility(isWorkspaceAddVisible) {
  return {
    isWorkspaceAddVisible: isWorkspaceAddVisible,
    type: ActionTypes.SET_WORKSPACE_ADD_VISIBILITY
  };
}
/**
 * setWorkspaceViewportPosition - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */

export function setWorkspaceViewportPosition(_ref) {
  var x = _ref.x,
      y = _ref.y;
  return {
    payload: {
      position: {
        x: x,
        y: y
      }
    },
    type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION
  };
}
/**
 * setWorkspaceViewportDimensions - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */

export function setWorkspaceViewportDimensions(_ref2) {
  var width = _ref2.width,
      height = _ref2.height;
  return {
    payload: {
      position: {
        height: height,
        width: width
      }
    },
    type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION
  };
}
/**
 * toggleDraggingEnabled - action creator
 */

export function toggleDraggingEnabled() {
  return {
    type: ActionTypes.TOGGLE_DRAGGING
  };
}