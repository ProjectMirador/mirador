import ActionTypes from './action-types';

/**
 * requestInfoResponse - action creator
 * @param  {string} infoId
 * @memberof ActionCreators
 */
export function requestInfoResponse(infoId, imageResource, windowId) {
  return {
    imageResource,
    infoId,
    type: ActionTypes.REQUEST_INFO_RESPONSE,
    windowId,
  };
}

/**
 * receiveInfoResponse - action creator
 * @param  {string} infoId
 * @param  {object} infoJson
 * @param  {boolean} ok
 * @param  {string} tokenServiceId
 * @memberof ActionCreators
 */
export function receiveInfoResponse(infoId, infoJson, ok, tokenServiceId) {
  return {
    infoId,
    infoJson,
    ok,
    tokenServiceId,
    type: ActionTypes.RECEIVE_INFO_RESPONSE,
  };
}

/**
 * receiveInfoResponse - action creator
 * @param  {string} infoId
 * @param  {object} infoJson
 * @param  {boolean} ok
 * @param  {string} tokenServiceId
 * @param  {string} windowId
 * @memberof ActionCreators
 */
export function receiveDegradedInfoResponse(
  infoId,
  infoJson,
  ok,
  tokenServiceId,
  windowId,
) {
  return {
    infoId,
    infoJson,
    ok,
    tokenServiceId,
    type: ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE,
    windowId,
  };
}

/**
 * receiveInfoResponseFailure - action creator
 * @param  {string} infoId
 * @param  {string} error
 * @memberof ActionCreators
 */
export function receiveInfoResponseFailure(infoId, error, tokenServiceId) {
  return {
    error,
    infoId,
    tokenServiceId,
    type: ActionTypes.RECEIVE_INFO_RESPONSE_FAILURE,
  };
}

/**
 * fetchInfoResponse - action creator
 * @param  {string} infoId
 * @memberof ActionCreators
 */
export function fetchInfoResponse({ imageId, imageResource, windowId }) {
  const imageService = imageResource && imageResource.getServices()[0];
  const infoId = imageId || imageService.id;
  return requestInfoResponse(infoId, imageService, windowId);
}

/**
 * removeInfoResponse - action creator
 * @param  {string} infoId
 * @memberof ActionCreators
 */
export function removeInfoResponse(infoId) {
  return { infoId, type: ActionTypes.REMOVE_INFO_RESPONSE };
}
