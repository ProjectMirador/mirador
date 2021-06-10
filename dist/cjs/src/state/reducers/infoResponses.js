"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoResponsesReducer = void 0;

var _actionTypes = _interopRequireDefault(require("../actions/action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * infoResponsesReducer
 */
var infoResponsesReducer = function infoResponsesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes["default"].REQUEST_INFO_RESPONSE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.infoId, {
        id: action.infoId,
        isFetching: true
      }));

    case _actionTypes["default"].RECEIVE_INFO_RESPONSE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.infoId, {
        degraded: false,
        id: action.infoId,
        isFetching: false,
        json: action.infoJson,
        tokenServiceId: action.tokenServiceId
      }));

    case _actionTypes["default"].RECEIVE_DEGRADED_INFO_RESPONSE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.infoId, {
        degraded: true,
        id: action.infoId,
        isFetching: false,
        json: action.infoJson,
        tokenServiceId: action.tokenServiceId
      }));

    case _actionTypes["default"].RECEIVE_INFO_RESPONSE_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.infoId, {
        error: action.error,
        id: action.infoId,
        isFetching: false,
        tokenServiceId: action.tokenServiceId
      }));

    case _actionTypes["default"].REMOVE_INFO_RESPONSE:
      return Object.keys(state).reduce(function (object, key) {
        if (key !== action.infoId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }

        return object;
      }, {});

    case _actionTypes["default"].IMPORT_MIRADOR_STATE:
      return {};

    default:
      return state;
  }
};

exports.infoResponsesReducer = infoResponsesReducer;