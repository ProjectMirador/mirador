import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import ActionTypes from './action-types';
import { fetchInfoResponse } from './infoResponse';

/**
 * addAuthenticationRequest - action creator
 *
 * @param  {String} windowId
 * @param  {String} infoId
 * @param  {String} id
 * @memberof ActionCreators
 */
export function addAuthenticationRequest(windowId, infoId, id) {
  return {
    id,
    infoId,
    type: ActionTypes.ADD_AUTHENTICATION_REQUEST,
    windowId,
  };
}

/**
 * resolveAuthenticationRequest - action creator
 *
 * @param {String} id
 * @memberof ActionCreators
 */
export function resolveAuthenticationRequest(id) {
  return ((dispatch, getState) => {
    const { auth } = getState();

    dispatch(fetchAccessTokenRequest(id, auth[id].infoId));
  });
}

/**
 * requestAccessToken - action creator
 * @private
 *
 * @param  {String} serviceId
 * @param  {String} authId
 * @param  {String} infoIds
 * @memberof ActionCreators
 */
export function requestAccessToken(serviceId, authId, infoIds) {
  return {
    authId,
    infoIds,
    serviceId,
    type: ActionTypes.REQUEST_ACCESS_TOKEN,
  };
}

/**
 * receiveAccessToken - action creator
 * @private
 *
 * @param  {String} serviceId
 * @param  {Object} json
 * @memberof ActionCreators
 */
export function receiveAccessToken(serviceId, json) {
  return {
    json,
    serviceId,
    type: ActionTypes.RECEIVE_ACCESS_TOKEN,
  };
}

/**
 * receiveAccessTokenFailure - action creator
 * @private
 *
 * @param  {String} serviceId
 * @param  {Object} error
 * @memberof ActionCreators
 */
export function receiveAccessTokenFailure(serviceId, error) {
  return {
    error,
    serviceId,
    type: ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE,
  };
}

/** @private */
export function fetchAccessTokenRequest(id, infoIds, providedServices = undefined) {
  return ((dispatch, getState) => {
    const { infoResponses } = getState();

    const infoResponse = infoResponses[infoIds[0]].json;

    const services = providedServices || Utils.getServices(infoResponse);

    const authService = services.find(e => e.id === id);

    if (!authService) return null;

    const accessTokenService = Utils.getService(authService, 'http://iiif.io/api/auth/1/token');

    dispatch(requestAccessToken(accessTokenService.id, authService.id, infoIds));
    return null;
  });
}

/**
 * resolveAccessTokenRequest - action creator
 *
 * @param {Object} message
 * @memberof ActionCreators
 */
export function resolveAccessTokenRequest({ messageId, ...json }) {
  return ((dispatch, getState) => {
    const { authId, infoIds } = getState().accessTokens[messageId];

    dispatch({
      id: authId,
      ok: !!json.accessToken,
      type: ActionTypes.RESOLVE_AUTHENTICATION_REQUEST,
    });

    if (json.accessToken) {
      dispatch(receiveAccessToken(messageId, json));
      infoIds.forEach(imageId => dispatch(fetchInfoResponse({ imageId })));
    } else {
      dispatch(receiveAccessTokenFailure(messageId, json));
    }
  });
}
