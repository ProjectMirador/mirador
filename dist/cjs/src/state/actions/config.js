"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importConfig = importConfig;
exports.setConfig = setConfig;
exports.updateConfig = updateConfig;
exports.importMiradorState = importMiradorState;

var _uuid = require("uuid");

var _actionTypes = _interopRequireDefault(require("./action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * importConfig - action creator
 *
 * @param  {Object} config
 * @memberof ActionCreators
 */
function importConfig(config) {
  return {
    config: config,
    type: _actionTypes["default"].IMPORT_CONFIG
  };
}
/**
 * setConfig - action creator
 *
 * @param  {Object} config
 * @memberof ActionCreators
 */


function setConfig(config) {
  return {
    config: config,
    type: _actionTypes["default"].SET_CONFIG
  };
}
/**
 * updateConfig - action creator
 *
 * @param  {Object} config
 * @memberof ActionCreators
 */


function updateConfig(config) {
  return {
    config: config,
    type: _actionTypes["default"].UPDATE_CONFIG
  };
}
/**
 * importMiradorState - action creator
 *
 * @param  {Object} config
 * @memberof ActionCreators
 */


function importMiradorState(state) {
  var newState = _objectSpread(_objectSpread({}, state), {}, {
    workspace: _objectSpread(_objectSpread({}, state.workspace), {}, {
      id: (0, _uuid.v4)()
    })
  });

  return {
    state: newState,
    type: _actionTypes["default"].IMPORT_MIRADOR_STATE
  };
}