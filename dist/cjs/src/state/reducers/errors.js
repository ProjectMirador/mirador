"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorsReducer = void 0;

var _without = _interopRequireDefault(require("lodash/without"));

var _actionTypes = _interopRequireDefault(require("../actions/action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultState = {
  items: []
};
/**
 * errorsReducer
 */

var errorsReducer = function errorsReducer() {
  var _objectSpread2, _objectSpread3, _objectSpread4;

  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var ret;

  switch (action.type) {
    case _actionTypes["default"].ADD_ERROR:
      return _objectSpread(_objectSpread({}, state), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, action.id, {
        id: action.id,
        message: action.message
      }), _defineProperty(_objectSpread2, "items", [].concat(_toConsumableArray(state.items), [action.id])), _objectSpread2));
    // eslint-disable-line max-len

    case _actionTypes["default"].RECEIVE_INFO_RESPONSE_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, (_objectSpread3 = {}, _defineProperty(_objectSpread3, action.infoId, {
        id: action.infoId,
        message: action.error
      }), _defineProperty(_objectSpread3, "items", [].concat(_toConsumableArray(state.items), [action.infoId])), _objectSpread3));

    case _actionTypes["default"].RECEIVE_SEARCH_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, (_objectSpread4 = {}, _defineProperty(_objectSpread4, action.searchId, {
        id: action.searchId,
        message: action.error
      }), _defineProperty(_objectSpread4, "items", [].concat(_toConsumableArray(state.items), [action.searchId])), _objectSpread4));

    case _actionTypes["default"].REMOVE_ERROR:
      ret = Object.keys(state).reduce(function (object, key) {
        if (key !== action.id) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }

        return object;
      }, {});
      ret.items = (0, _without["default"])(ret.items, action.id);
      return ret;

    case _actionTypes["default"].IMPORT_MIRADOR_STATE:
      return defaultState;

    default:
      return state;
  }
};

exports.errorsReducer = errorsReducer;