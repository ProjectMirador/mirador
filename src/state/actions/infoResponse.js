import ActionTypes from './action-types';

/**
 * requestInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function requestInfoResponse(infoId, imageResource) {
  return {
    imageResource,
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
 * receiveDegradedInfoResponse - action creator
 *
 * @param  {String} infoId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */
export function receiveDegradedInfoResponse(infoId, infoJson, ok, tokenServiceId) {
  return {
    infoId,
    infoJson,
    ok,
    tokenServiceId,
    type: ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE,
  };
}

/**
 * receiveInfoResponseFailure - action creator
 *
 * @param  {String} infoId
 * @param  {String} error
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
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function fetchInfoResponse({ imageId, imageResource }) {
  const imageService = imageResource && imageResource.getServices()[0];
  const infoId = (imageId || imageService.id);
  return requestInfoResponse(infoId, imageService);
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
