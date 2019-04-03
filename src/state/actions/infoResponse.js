import fetch from 'node-fetch';
import ActionTypes from './action-types';

/**
 * requestInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function requestInfoResponse(infoId) {
  return {
    infoId,
    type: ActionTypes.REQUEST_INFO_RESPONSE,
  };
}

/**
 * receiveInfoResponse - action creator
 *
 * @param  {String} infoId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */
export function receiveInfoResponse(infoId, infoJson, ok) {
  return {
    infoId,
    infoJson,
    ok,
    type: ActionTypes.RECEIVE_INFO_RESPONSE,
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
    error,
    infoId,
    type: ActionTypes.RECEIVE_INFO_RESPONSE_FAILURE,
  };
}

/**
 * fetchInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function fetchInfoResponse({ imageId, imageResource }) {
  return ((dispatch) => {
    const infoId = imageId || `${
      imageResource.getServices()[0].id.replace(/\/$/, '')
    }`;
    dispatch(requestInfoResponse(infoId));

    return fetch(`${infoId}/info.json`)
      .then(response => response.json().then(json => ({ json, ok: response.ok })))
      .then(({ json, ok }) => dispatch(receiveInfoResponse(infoId, json, ok)))
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
  return { infoId, type: ActionTypes.REMOVE_INFO_RESPONSE };
}
