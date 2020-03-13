import fetch from 'isomorphic-unfetch';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
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
/** @private */
function getAccessToken({ accessTokens }, iiifService) {
  if (!iiifService) return undefined;

  const services = Utils.getServices(iiifService).filter(s => s.getProfile().match(/http:\/\/iiif.io\/api\/auth\/1\//));

  for (let i = 0; i < services.length; i += 1) {
    const authService = services[i];
    const accessTokenService = Utils.getService(authService, 'http://iiif.io/api/auth/1/token');
    const token = accessTokens[accessTokenService.id];
    if (token && token.json) return token.json.accessToken;
  }

  return undefined;
}

/**
 * fetchInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function fetchInfoResponse({ imageId, imageResource }) {
  return ((dispatch, getState) => {
    const state = getState();
    const infoId = imageId || `${
      imageResource.getServices()[0].id.replace(/\/$/, '')
    }`;
    const headers = {};

    const infoResponse = infoId
      && state.infoResponses
      && state.infoResponses[infoId]
      && !state.infoResponses[infoId].isFetching
      && state.infoResponses[infoId].json;

    const token = getAccessToken(
      getState(),
      infoResponse || (imageResource && imageResource.getServices()[0]),
    );

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    dispatch(requestInfoResponse(infoId));

    return fetch(`${infoId}/info.json`, { headers })
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
