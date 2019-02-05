import ActionTypes from './action-types';

/* eslint-disable import/prefer-default-export */
/**
 * setWorkspaceFullscreen - action creator
 *
 * @param  {Boolean} isFullscreenEnabled
 * @memberof ActionCreators
 */
export function setWorkspaceFullscreen(isFullscreenEnabled) {
  return { type: ActionTypes.SET_WORKSPACE_FULLSCREEN, isFullscreenEnabled };
}

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} layout
 * @memberof ActionCreators
 */
export function updateWorkspaceMosaicLayout(layout) {
  return { type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT, layout };
}
