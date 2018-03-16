import fetch from 'node-fetch';
import ActionTypes from '../action-types';

/*
 * Action creators
 */

export function focusWindow(windowId) {
  return { type: ActionTypes.FOCUS_WINDOW, windowId };
}

export function addWindow(options) {
  const defaultOptions = {
    // TODO: Windows should be a hash with id's as keys for easy lookups
    // https://redux.js.org/faq/organizing-state#how-do-i-organize-nested-or-duplicate-data-in-my-state
    id: `window.${new Date().valueOf()}`,
    canvasIndex: 0,
    collectionIndex: 0,
    manifestIndex: 0,
    rangeId: null,
    xywh: null,
    rotation: null,
  };
  return { type: ActionTypes.ADD_WINDOW, payload: Object.assign({}, defaultOptions, options) };
}

export function removeWindow(windowId) {
  return { type: ActionTypes.REMOVE_WINDOW, windowId };
}

export function nextCanvas(windowId) {
  return { type: ActionTypes.NEXT_CANVAS, windowId };
}

export function previousCanvas(windowId) {
  return { type: ActionTypes.PREVIOUS_CANVAS, windowId };
}

export function requestManifest(manifestId) {
  return {
    type: ActionTypes.REQUEST_MANIFEST,
    manifestId,
  };
}

export function receiveManifest(manifestId, manifestJson) {
  return {
    type: ActionTypes.RECEIVE_MANIFEST,
    manifestId,
    manifestJson, // Wrap in manifesto??
  };
}

export function receiveManifestFailure(manifestId, error) {
  return {
    type: ActionTypes.RECEIVE_MANIFEST_FAILURE,
    manifestId,
    error,
  };
}

export function fetchManifest(manifestId) {
  return ((dispatch) => {
    dispatch(requestManifest(manifestId));
    return fetch(manifestId)
      .then(response => response.json())
      .then(json => dispatch(receiveManifest(manifestId, json)))
      .catch(error => dispatch(receiveManifestFailure(manifestId, error)));
  });
}
