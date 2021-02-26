"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configReducer = void 0;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _settings = _interopRequireDefault(require("../../config/settings"));

var _actionTypes = _interopRequireDefault(require("../actions/action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = _objectSpread({}, _settings["default"]);
/** Overwrite arrays when deep merging */


var overwriteMerge = function overwriteMerge(destinationArray, sourceArray, options) {
  return sourceArray;
};
/**
 * configReducer - does a deep merge of the config
 */


var configReducer = function configReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes["default"].UPDATE_CONFIG:
    case _actionTypes["default"].IMPORT_CONFIG:
      return (0, _deepmerge["default"])(state, action.config, {
        arrayMerge: overwriteMerge
      });

    case _actionTypes["default"].SET_CONFIG:
      return action.config;

    case _actionTypes["default"].IMPORT_MIRADOR_STATE:
      return action.state.config || {};

    default:
      return state;
  }
};

exports.configReducer = configReducer;