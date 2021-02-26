import ActionTypes from './action-types';
/**
 * requestInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */

export function requestInfoResponse(infoId, imageResource, windowId) {
  return {
    imageResource: imageResource,
    infoId: infoId,
    type: ActionTypes.REQUEST_INFO_RESPONSE,
    windowId: windowId
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
    infoId: infoId,
    infoJson: infoJson,
    ok: ok,
    tokenServiceId: tokenServiceId,
    type: ActionTypes.RECEIVE_INFO_RESPONSE
  };
}
/**
 * receiveDegradedInfoResponse - action creator
 *
 * @param  {String} infoId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */

export function receiveDegradedInfoResponse(infoId, infoJson, ok, tokenServiceId, windowId) {
  return {
    infoId: infoId,
    infoJson: infoJson,
    ok: ok,
    tokenServiceId: tokenServiceId,
    type: ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE,
    windowId: windowId
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
    error: error,
    infoId: infoId,
    tokenServiceId: tokenServiceId,
    type: ActionTypes.RECEIVE_INFO_RESPONSE_FAILURE
  };
}
/**
 * fetchInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */

export function fetchInfoResponse(_ref) {
  var imageId = _ref.imageId,
      imageResource = _ref.imageResource,
      windowId = _ref.windowId;
  var imageService = imageResource && imageResource.getServices()[0];
  var infoId = imageId || imageService.id;
  return requestInfoResponse(infoId, imageService, windowId);
}
/**
 * removeInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */

export function removeInfoResponse(infoId) {
  return {
    infoId: infoId,
    type: ActionTypes.REMOVE_INFO_RESPONSE
  };
}