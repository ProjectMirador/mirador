import ActionTypes from './action-types';
/**
 * setCanvas - action creator
 *
 * @param  {String} windowId
 * @param  {Number} canvasIndex
 * @memberof ActionCreators
 */
export function setCanvas(windowId, canvasIndex) {
  return { type: ActionTypes.SET_CANVAS, windowId, canvasIndex };
}

/**
 *
 * @param windowId
 * @param payload
 * @returns {{payload: *, meta: {debounce: {time: number}}, type: string, windowId: *}}
 */
export function updateViewport(windowId, payload) {
  return {
    type: ActionTypes.UPDATE_VIEWPORT,
    meta: {
      debounce: {
        // TODO : set this value in a registry
        time: 100,
      },
    },
    windowId,
    payload,
  };
}
