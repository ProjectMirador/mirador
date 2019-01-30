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
