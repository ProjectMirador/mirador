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
 * @param  {String} targetId
 * @param  {String} searchId
 * @param  {String} query
 * @memberof ActionCreators
 */
export function requestSearch(targetId, companionWindowId, query) {
  return {
    companionWindowId,
    query,
    targetId,
    type: ActionTypes.REQUEST_SEARCH,
  };
}

/**
 * receiveSearch - action creator
 *
 * @param  {String} targetId
 * @param  {String} searchId
 * @param  {Object} searchJson
 * @memberof ActionCreators
 */
export function receiveSearch(targetId, companionWindowId, searchJson) {
  return {
    companionWindowId,
    searchJson,
    targetId,
    type: ActionTypes.RECEIVE_SEARCH,
  };
}

/**
 * receiveSearchFailure - action creator
 *
 * @param  {String} targetId
 * @param  {String} searchId
 * @param  {String} error
 * @memberof ActionCreators
 */
export function receiveSearchFailure(targetId, companionWindowId, error) {
  return {
    companionWindowId,
    error,
    targetId,
    type: ActionTypes.RECEIVE_SEARCH_FAILURE,
  };
}

/**
 * removeSearch - action creator
 *
 * @param  {String} targetId
 * @param  {String} companionWindowId
 * @memberof ActionCreators
 */
export function removeSearch(targetId, companionWindowId) {
  return {
    companionWindowId,
    targetId,
    type: ActionTypes.REMOVE_SEARCH,
  };
}

/**
 * fetchSearch - action creator
 *
 * @param  {String} searchId
 * @param  {String} query
 * @memberof ActionCreators
 */
export function fetchSearch(targetId, companionWindowId, searchId, query) {
  return ((dispatch) => {
    dispatch(requestSearch(targetId, companionWindowId, query));
    return fetch(searchId)
      .then(response => response.json())
      .then(json => dispatch(receiveSearch(targetId, companionWindowId, json)))
      .catch(error => dispatch(receiveSearchFailure(targetId, companionWindowId, error)));
  });
}

/**
 * selectedContentSearchAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export function selectContentSearchAnnotation(windowId, annotationIds) {
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
      type: ActionTypes.SELECT_CONTENT_SEARCH_ANNOTATION,
      windowId,
    });
  };
}
