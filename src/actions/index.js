import fetch from 'node-fetch';
import ActionTypes from '../action-types';

/**
 * Action Creators for Mirador
 * @namespace ActionCreators
 */

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
    id: `window-${new Date().valueOf()}`,
    canvasIndex: 0,
    collectionIndex: 0,
    manifestId: null,
    rangeId: null,
    xywh: null,
    rotation: null,
  };
  return { type: ActionTypes.ADD_WINDOW, payload: Object.assign({}, defaultOptions, options) };
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
 * requestManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
export function requestManifest(manifestId) {
  return {
    type: ActionTypes.REQUEST_MANIFEST,
    manifestId,
  };
}

/**
 * receiveManifest - action creator
 *
 * @param  {String} windowId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */
export function receiveManifest(manifestId, manifestJson) {
  return {
    type: ActionTypes.RECEIVE_MANIFEST,
    manifestId,
    manifestJson,
  };
}

/**
 * receiveManifestFailure - action creator
 *
 * @param  {String} windowId
 * @param  {String} error
 * @memberof ActionCreators
 */
export function receiveManifestFailure(manifestId, error) {
  return {
    type: ActionTypes.RECEIVE_MANIFEST_FAILURE,
    manifestId,
    error,
  };
}

/**
 * fetchManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
export function fetchManifest(manifestId) {
  return ((dispatch) => {
    dispatch(requestManifest(manifestId));
    return fetch(manifestId)
      .then(response => response.json())
      .then(json => dispatch(receiveManifest(manifestId, json)))
      .catch(error => dispatch(receiveManifestFailure(manifestId, error)));
  });
}
