import ActionTypes from './action-types';
/**
 * setCanvas - action creator
 *
 * @param  {String} windowId
 * @param  {Number} canvasIndex
 * @memberof ActionCreators
 */
export function setCanvas(windowId, canvasIndex) {
  return {
    canvasIndex,
    type: ActionTypes.SET_CANVAS,
    windowId,
  };
}

/**
 *
 * @param windowId
 * @param payload
 * @returns {{payload: *, meta: {debounce: {time: number}}, type: string, windowId: *}}
 */
export function updateViewport(windowId, payload) {
  return {
    meta: {
      debounce: {
        // TODO : set this value in a registry
        time: 100,
      },
    },
    payload,
    type: ActionTypes.UPDATE_VIEWPORT,
    windowId,
  };
}
