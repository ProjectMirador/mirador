"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestInfoResponse = requestInfoResponse;
exports.receiveInfoResponse = receiveInfoResponse;
exports.receiveDegradedInfoResponse = receiveDegradedInfoResponse;
exports.receiveInfoResponseFailure = receiveInfoResponseFailure;
exports.fetchInfoResponse = fetchInfoResponse;
exports.removeInfoResponse = removeInfoResponse;

var _actionTypes = _interopRequireDefault(require("./action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * requestInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
function requestInfoResponse(infoId, imageResource, windowId) {
  return {
    imageResource: imageResource,
    infoId: infoId,
    type: _actionTypes["default"].REQUEST_INFO_RESPONSE,
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


function receiveInfoResponse(infoId, infoJson, ok, tokenServiceId) {
  return {
    infoId: infoId,
    infoJson: infoJson,
    ok: ok,
    tokenServiceId: tokenServiceId,
    type: _actionTypes["default"].RECEIVE_INFO_RESPONSE
  };
}
/**
 * receiveDegradedInfoResponse - action creator
 *
 * @param  {String} infoId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */


function receiveDegradedInfoResponse(infoId, infoJson, ok, tokenServiceId, windowId) {
  return {
    infoId: infoId,
    infoJson: infoJson,
    ok: ok,
    tokenServiceId: tokenServiceId,
    type: _actionTypes["default"].RECEIVE_DEGRADED_INFO_RESPONSE,
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


function receiveInfoResponseFailure(infoId, error, tokenServiceId) {
  return {
    error: error,
    infoId: infoId,
    tokenServiceId: tokenServiceId,
    type: _actionTypes["default"].RECEIVE_INFO_RESPONSE_FAILURE
  };
}
/**
 * fetchInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */


function fetchInfoResponse(_ref) {
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


function removeInfoResponse(infoId) {
  return {
    infoId: infoId,
    type: _actionTypes["default"].REMOVE_INFO_RESPONSE
  };
}