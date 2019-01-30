import ActionTypes from './action-types';

/**
 * nextCanvas - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function nextCanvas(windowId) {
  return { type: ActionTypes.NEXT_CANVAS, windowId };
}

/**
 * previousCanvas - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function previousCanvas(windowId) {
  return { type: ActionTypes.PREVIOUS_CANVAS, windowId };
}

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
