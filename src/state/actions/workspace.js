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
 * setWorkspaceViewportPosition - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export function setWorkspaceViewportPosition(position) {
  return {
    type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
    payload: {
      position: {
        x: position.x,
        y: position.y,
      },
    },
  };
}

/**
 * toggleWorkspaceExposeMode - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export function toggleWorkspaceExposeMode() {
  return {
    type: ActionTypes.TOGGLE_WORKSPACE_EXPOSE_MODE,
  };
}
