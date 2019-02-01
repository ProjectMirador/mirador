import ActionTypes from './action-types';

/* eslint-disable import/prefer-default-export */
/**
 * fullscreenWorkspace - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function fullscreenWorkspace(fullscreen) {
  return { type: ActionTypes.FULLSCREEN_WORKSPACE, fullscreen };
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
