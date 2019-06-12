import fetch from 'node-fetch';
import ActionTypes from './action-types';

/**
 * requestSearch - action creator
 *
 * @param  {String} targetId
 * @param  {String} searchId
 * @memberof ActionCreators
 */
export function requestSearch(targetId, companionWindowId) {
  return {
    companionWindowId,
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
 * @memberof ActionCreators
 */
export function fetchSearch(targetId, companionWindowId, searchId) {
  return ((dispatch) => {
    dispatch(requestSearch(targetId, companionWindowId));
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
export function selectContentSearchAnnotation(windowId, annotationId) {
  return {
    annotationId,
    type: ActionTypes.SELECT_CONTENT_SEARCH_ANNOTATION,
    windowId,
  };
}
