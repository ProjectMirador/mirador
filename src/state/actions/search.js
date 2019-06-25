import fetch from 'node-fetch';
import flatten from 'lodash/flatten';
import {
  getCanvas,
  getSearchAnnotationsForWindow,
} from '../selectors';
import ActionTypes from './action-types';

/**
 * requestSearch - action creator
 *
 * @param  {String} windowId
 * @param  {String} searchId
 * @param  {String} query
 * @memberof ActionCreators
 */
export function requestSearch(windowId, companionWindowId, searchId, query) {
  return {
    companionWindowId,
    query,
    searchId,
    type: ActionTypes.REQUEST_SEARCH,
    windowId,
  };
}

/**
 * receiveSearch - action creator
 *
 * @param  {String} windowId
 * @param  {String} searchId
 * @param  {Object} searchJson
 * @memberof ActionCreators
 */
export function receiveSearch(windowId, companionWindowId, searchId, searchJson) {
  return {
    companionWindowId,
    searchId,
    searchJson,
    type: ActionTypes.RECEIVE_SEARCH,
    windowId,
  };
}

/**
 * receiveSearchFailure - action creator
 *
 * @param  {String} windowId
 * @param  {String} searchId
 * @param  {String} error
 * @memberof ActionCreators
 */
export function receiveSearchFailure(windowId, companionWindowId, searchId, error) {
  return {
    companionWindowId,
    error,
    searchId,
    type: ActionTypes.RECEIVE_SEARCH_FAILURE,
    windowId,
  };
}

/**
 * removeSearch - action creator
 *
 * @param  {String} windowId
 * @param  {String} companionWindowId
 * @memberof ActionCreators
 */
export function removeSearch(windowId, companionWindowId) {
  return {
    companionWindowId,
    type: ActionTypes.REMOVE_SEARCH,
    windowId,
  };
}

/**
 * fetchSearch - action creator
 *
 * @param  {String} searchId
 * @param  {String} query
 * @memberof ActionCreators
 */
export function fetchSearch(windowId, companionWindowId, searchId, query) {
  return ((dispatch) => {
    dispatch(requestSearch(windowId, companionWindowId, searchId, query));
    return fetch(searchId)
      .then(response => response.json())
      .then(json => dispatch(receiveSearch(windowId, companionWindowId, searchId, json)))
      .catch(error => dispatch(receiveSearchFailure(windowId, companionWindowId, searchId, error)));
  });
}

/**
 * selectedContentSearchAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export function selectContentSearchAnnotation(windowId, companionWindowId, annotationIds) {
  return (dispatch, getState) => {
    const state = getState();
    const annotations = getSearchAnnotationsForWindow(state, { windowId });
    const resourceAnnotations = flatten(annotations.map(a => a.resources));
    const hitAnnotation = resourceAnnotations.find(r => r.id === annotationIds[0]);
    const canvasId = hitAnnotation && hitAnnotation.targetId;
    const canvas = canvasId && getCanvas(state, { canvasId, windowId });

    dispatch({
      annotationId: annotationIds,
      canvasIndex: canvas && canvas.index,
      companionWindowId,
      type: ActionTypes.SELECT_CONTENT_SEARCH_ANNOTATION,
      windowId,
    });
  };
}
