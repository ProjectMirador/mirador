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
 * updateViewport - action creator
 *
 * @param  {String} windowId
 * @param  {Number} canvasIndex
 * @memberof ActionCreators
 */
export function updateViewport(windowId, payload) {
  return { type: ActionTypes.UPDATE_VIEWPORT, windowId, payload };
}
