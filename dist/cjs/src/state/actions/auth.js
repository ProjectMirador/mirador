"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAuthenticationRequest = addAuthenticationRequest;
exports.resolveAuthenticationRequest = resolveAuthenticationRequest;
exports.requestAccessToken = requestAccessToken;
exports.receiveAccessToken = receiveAccessToken;
exports.receiveAccessTokenFailure = receiveAccessTokenFailure;
exports.resolveAccessTokenRequest = resolveAccessTokenRequest;
exports.resetAuthenticationState = resetAuthenticationState;

var _actionTypes = _interopRequireDefault(require("./action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * addAuthenticationRequest - action creator
 *
 * @param  {String} windowId
 * @param  {String} id
 * @memberof ActionCreators
 */
function addAuthenticationRequest(windowId, id) {
  var profile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return {
    id: id,
    profile: profile,
    type: _actionTypes["default"].ADD_AUTHENTICATION_REQUEST,
    windowId: windowId
  };
}
/**
 * resolveAuthenticationRequest - action creator
 * Triggered when we might have an IIIF auth cookie available (but we
 *   can't be really sure until try the access token)
 *
 * @param {String} id
 * @memberof ActionCreators
 */


function resolveAuthenticationRequest(id, tokenServiceId, props) {
  return _objectSpread({
    id: id,
    tokenServiceId: tokenServiceId,
    type: _actionTypes["default"].RESOLVE_AUTHENTICATION_REQUEST
  }, props);
}
/**
 * requestAccessToken - action creator
 * @private
 *
 * @param  {String} serviceId
 * @param  {String} authId
 * @memberof ActionCreators
 */


function requestAccessToken(serviceId, authId) {
  return {
    authId: authId,
    serviceId: serviceId,
    type: _actionTypes["default"].REQUEST_ACCESS_TOKEN
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


function receiveAccessToken(authId, serviceId, json) {
  return {
    authId: authId,
    json: json,
    serviceId: serviceId,
    type: _actionTypes["default"].RECEIVE_ACCESS_TOKEN
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


function receiveAccessTokenFailure(authId, serviceId, error) {
  return {
    authId: authId,
    error: error,
    serviceId: serviceId,
    type: _actionTypes["default"].RECEIVE_ACCESS_TOKEN_FAILURE
  };
}
/**
 * resolveAccessTokenRequest - action creator
 *
 * @param {Object} message
 * @memberof ActionCreators
 */


function resolveAccessTokenRequest(authServiceId, tokenServiceId, json) {
  if (!json.accessToken) return receiveAccessTokenFailure(authServiceId, tokenServiceId, json);
  return receiveAccessToken(authServiceId, tokenServiceId, json);
}
/**
 * Resets authentication state for a token service
 */


function resetAuthenticationState(_ref) {
  var authServiceId = _ref.authServiceId,
      tokenServiceId = _ref.tokenServiceId;
  return {
    id: authServiceId,
    tokenServiceId: tokenServiceId,
    type: _actionTypes["default"].RESET_AUTHENTICATION_STATE
  };
}