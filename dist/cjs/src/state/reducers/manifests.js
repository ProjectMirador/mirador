"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manifestsReducer = void 0;

var _omit = _interopRequireDefault(require("lodash/omit"));

var _actionTypes = _interopRequireDefault(require("../actions/action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * manifestsReducer
 */
var manifestsReducer = function manifestsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes["default"].REQUEST_MANIFEST:
      return _objectSpread(_defineProperty({}, action.manifestId, _objectSpread(_objectSpread(_objectSpread({}, state[action.manifestId]), action.properties), {}, {
        id: action.manifestId
      })), (0, _omit["default"])(state, action.manifestId));

    case _actionTypes["default"].RECEIVE_MANIFEST:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.manifestId, _objectSpread(_objectSpread({}, state[action.manifestId]), {}, {
        error: null,
        // Explicitly set the error to null in case this is a re-fetch
        id: action.manifestId,
        isFetching: false,
        json: action.manifestJson
      })));

    case _actionTypes["default"].RECEIVE_MANIFEST_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.manifestId, _objectSpread(_objectSpread({}, state[action.manifestId]), {}, {
        error: action.error,
        id: action.manifestId,
        isFetching: false
      })));

    case _actionTypes["default"].REMOVE_MANIFEST:
      return Object.keys(state).reduce(function (object, key) {
        if (key !== action.manifestId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }

        return object;
      }, {});

    case _actionTypes["default"].IMPORT_MIRADOR_STATE:
      return action.state.manifests || {};

    default:
      return state;
  }
};

exports.manifestsReducer = manifestsReducer;