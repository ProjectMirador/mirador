function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import ActionTypes from '../actions/action-types';
/**
 * catalogReducer
 */

export var catalogReducer = function catalogReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ActionTypes.ADD_RESOURCE:
      if (state.some(function (m) {
        return m.manifestId === action.manifestId;
      })) return state;
      return [_objectSpread({
        manifestId: action.manifestId
      }, action.payload)].concat(_toConsumableArray(state));

    case ActionTypes.ADD_WINDOW:
      if (state.some(function (m) {
        return m.manifestId === action.window.manifestId;
      })) return state;
      return [{
        manifestId: action.window.manifestId
      }].concat(_toConsumableArray(state));

    case ActionTypes.UPDATE_WINDOW:
      if (!action.payload.manifestId) return state;
      if (state.some(function (m) {
        return m.manifestId === action.payload.manifestId;
      })) return state;
      return [{
        manifestId: action.payload.manifestId
      }].concat(_toConsumableArray(state));

    case ActionTypes.REMOVE_RESOURCE:
      return state.filter(function (r) {
        return r.manifestId !== action.manifestId;
      });

    case ActionTypes.IMPORT_CONFIG:
      return action.config.catalog || [];

    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.catalog || [];

    default:
      return state;
  }
};