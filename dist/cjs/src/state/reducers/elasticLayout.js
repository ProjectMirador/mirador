"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elasticLayoutReducer = void 0;

var _update = _interopRequireDefault(require("lodash/fp/update"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _actionTypes = _interopRequireDefault(require("../actions/action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * elasticLayoutReducer
 */
var elasticLayoutReducer = function elasticLayoutReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes["default"].ADD_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.window.id, _objectSpread({
        windowId: action.window.id
      }, action.elasticLayout)));

    case _actionTypes["default"].UPDATE_ELASTIC_WINDOW_LAYOUT:
      return (0, _update["default"])([action.windowId], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), action.payload);
      }, state);

    case _actionTypes["default"].REMOVE_WINDOW:
      return (0, _omit["default"])(state, action.windowId);

    case _actionTypes["default"].IMPORT_MIRADOR_STATE:
      return action.state.elasticLayout || {};

    default:
      return state;
  }
};

exports.elasticLayoutReducer = elasticLayoutReducer;