"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestManifest = requestManifest;
exports.receiveManifest = receiveManifest;
exports.receiveManifestFailure = receiveManifestFailure;
exports.fetchManifest = fetchManifest;
exports.removeManifest = removeManifest;

var _actionTypes = _interopRequireDefault(require("./action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * requestManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
function requestManifest(manifestId, properties) {
  return {
    manifestId: manifestId,
    properties: properties,
    type: _actionTypes["default"].REQUEST_MANIFEST
  };
}
/**
 * receiveManifest - action creator
 *
 * @param  {String} manifestId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */


function receiveManifest(manifestId, manifestJson) {
  return {
    manifestId: manifestId,
    manifestJson: manifestJson,
    type: _actionTypes["default"].RECEIVE_MANIFEST
  };
}
/**
 * receiveManifestFailure - action creator
 *
 * @param  {String} windowId
 * @param  {String} error
 * @memberof ActionCreators
 */


function receiveManifestFailure(manifestId, error) {
  return {
    error: error,
    manifestId: manifestId,
    type: _actionTypes["default"].RECEIVE_MANIFEST_FAILURE
  };
}
/**
 * fetchManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */


function fetchManifest(manifestId, properties) {
  return requestManifest(manifestId, _objectSpread(_objectSpread({}, properties), {}, {
    isFetching: true
  }));
}
/**
 * removeManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */


function removeManifest(manifestId) {
  return {
    manifestId: manifestId,
    type: _actionTypes["default"].REMOVE_MANIFEST
  };
}