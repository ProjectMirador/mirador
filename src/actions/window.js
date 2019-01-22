import uuid from 'uuid/v4';
import ActionTypes from '../action-types';

/**
 * focusWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function focusWindow(windowId) {
  return { type: ActionTypes.FOCUS_WINDOW, windowId };
}

/**
 * addWindow - action creator
 *
 * @param  {Object} options
 * @memberof ActionCreators
 */
export function addWindow(options) {
  const defaultOptions = {
    // TODO: Windows should be a hash with id's as keys for easy lookups
    // https://redux.js.org/faq/organizing-state#how-do-i-organize-nested-or-duplicate-data-in-my-state
    id: `window-${uuid()}`,
    canvasIndex: 0,
    collectionIndex: 0,
    manifestId: null,
    rangeId: null,
    xywh: [0, 0, 400, 400],
    rotation: null,
  };
  return { type: ActionTypes.ADD_WINDOW, window: { ...defaultOptions, ...options } };
}

/**
 * removeWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function removeWindow(windowId) {
  return { type: ActionTypes.REMOVE_WINDOW, windowId };
}
