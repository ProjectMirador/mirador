import ActionTypes from './action-types';

/**
 * requestSearch - action creator
 * @param  {string} windowId
 * @param  {string} companionWindowId
 * @param  {string} searchId
 * @param  {string} query
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
 * @param  {string} windowId
 * @param  {string} companionWindowId
 * @param  {string} searchId
 * @param  {object} searchJson
 * @memberof ActionCreators
 */
export function receiveSearch(
  windowId,
  companionWindowId,
  searchId,
  searchJson,
) {
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
 * @param  {string} windowId
 * @param  {string} companionWindowId
 * @param  {string} searchId
 * @param  {string} error
 * @memberof ActionCreators
 */
export function receiveSearchFailure(
  windowId,
  companionWindowId,
  searchId,
  error,
) {
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
 * @param  {string} windowId
 * @param  {string} companionWindowId
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
 * @param  {string} windowId
 * @param  {string} companionWindowId
 * @param  {string} searchId
 * @param  {string} query
 * @memberof ActionCreators
 */
export function fetchSearch(windowId, companionWindowId, searchId, query) {
  return requestSearch(windowId, companionWindowId, searchId, query);
}

/**
 * setContentSearchCurrentAnnotation - action creator
 * @param  {string} windowId
 * @param  {string} companionWindowId
 * @param  {string} annotationIds
 * @memberof ActionCreators
 */
export function setContentSearchCurrentAnnotation(
  windowId,
  companionWindowId,
  annotationIds,
) {
  return {
    annotationIds,
    companionWindowId,
    type: ActionTypes.SET_CONTENT_SEARCH_CURRENT_ANNOTATIONS,
    windowId,
  };
}
