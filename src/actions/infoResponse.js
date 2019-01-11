import fetch from 'node-fetch';
import ActionTypes from '../action-types';

/**
 * requestInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function requestInfoResponse(infoId) {
  return {
    type: ActionTypes.REQUEST_INFO_RESPONSE,
    infoId,
  };
}

/**
 * receiveInfoResponse - action creator
 *
 * @param  {String} infoId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */
export function receiveInfoResponse(infoId, infoJson) {
  return {
    type: ActionTypes.RECEIVE_INFO_RESPONSE,
    infoId,
    infoJson,
  };
}

/**
 * receiveInfoResponseFailure - action creator
 *
 * @param  {String} infoId
 * @param  {String} error
 * @memberof ActionCreators
 */
export function receiveInfoResponseFailure(infoId, error) {
  return {
    type: ActionTypes.RECEIVE_INFO_RESPONSE_FAILURE,
    infoId,
    error,
  };
}

/**
 * fetchInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function fetchInfoResponse(infoId) {
  return ((dispatch) => {
    dispatch(requestInfoResponse(infoId));
    return fetch(infoId)
      .then(response => response.json())
      .then(json => dispatch(receiveInfoResponse(infoId, json)))
      .catch(error => dispatch(receiveInfoResponseFailure(infoId, error)));
  });
}

/**
 * removeInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function removeInfoResponse(infoId) {
  return { type: ActionTypes.REMOVE_INFO_RESPONSE, infoId };
}
