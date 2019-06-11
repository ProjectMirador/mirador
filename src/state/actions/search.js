import fetch from 'node-fetch';
import ActionTypes from './action-types';

/**
 * requestSearch - action creator
 *
 * @param  {String} targetId
 * @param  {String} searchId
 * @memberof ActionCreators
 */
export function requestSearch(targetId, searchId) {
  return {
    searchId,
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
export function receiveSearch(targetId, searchId, searchJson) {
  return {
    searchId,
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
export function receiveSearchFailure(targetId, searchId, error) {
  return {
    error,
    searchId,
    targetId,
    type: ActionTypes.RECEIVE_SEARCH_FAILURE,
  };
}

/**
 * fetchSearch - action creator
 *
 * @param  {String} searchId
 * @memberof ActionCreators
 */
export function fetchSearch(targetId, searchId) {
  return ((dispatch) => {
    dispatch(requestSearch(targetId, searchId));
    return fetch(searchId)
      .then(response => response.json())
      .then(json => dispatch(receiveSearch(targetId, searchId, json)))
      .catch(error => dispatch(receiveSearchFailure(targetId, searchId, error)));
  });
}
