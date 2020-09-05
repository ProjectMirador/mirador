import ActionTypes from './action-types';

/**
 * updateWorkspace - action creator
 *
 * @param {Object} config
 */
export function updateWorkspace(config) {
  return { config, type: ActionTypes.UPDATE_WORKSPACE };
}

/**
 * setWorkspaceFullscreen - action creator
 *
 * @param  {Boolean} isFullscreenEnabled
 * @memberof ActionCreators
 */
export function setWorkspaceFullscreen(isFullscreenEnabled) {
  return { isFullscreenEnabled, type: ActionTypes.SET_WORKSPACE_FULLSCREEN };
}

/**
 * toggleZoomControls - action creator
 * @param {Boolean} showZoomControls
 * @memberof ActionCreators
*/
export function toggleZoomControls(showZoomControls) {
  return { showZoomControls, type: ActionTypes.TOGGLE_ZOOM_CONTROLS };
}

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} layout
 * @memberof ActionCreators
 */
export function updateWorkspaceMosaicLayout(layout) {
  return { layout, type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT };
}

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} isWorkspaceAddVisible
 * @memberof ActionCreators
 */
export function setWorkspaceAddVisibility(isWorkspaceAddVisible) {
  return { isWorkspaceAddVisible, type: ActionTypes.SET_WORKSPACE_ADD_VISIBILITY };
}

/**
 * setWorkspaceViewportPosition - action creator
 *
 * @param  {Object} position
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
 *
 * @param  {Object} position
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

/** */
export function showCollectionDialog(manifestId, collectionPath = [], windowId = null) {
  console.log(manifestId, collectionPath);
  return {
    collectionPath,
    manifestId,
    type: ActionTypes.SHOW_COLLECTION_DIALOG,
    windowId,
  };
}

/** */
export function hideCollectionDialog() {
  return {
    type: ActionTypes.HIDE_COLLECTION_DIALOG,
  };
}
