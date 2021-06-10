"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTargetToPluginMapping = createTargetToPluginMapping;
exports.connectPluginsToStore = connectPluginsToStore;
exports.addPluginsToCompanionWindowsRegistry = addPluginsToCompanionWindowsRegistry;

var _update = _interopRequireDefault(require("lodash/update"));

var _reactRedux = require("react-redux");

var _CompanionWindowRegistry = _interopRequireDefault(require("../lib/CompanionWindowRegistry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Returns a mapping from targets to plugins and modes
 *
 * @param {Array} plugins
 * @return {Object} - looks like:
 *
 *  {
 *    'WorkspacePanel': {
 *      wrap:     [plugin3, ...],
 *      add:      [plugin4, ...],
 *    },
 *    ...
 *  }
 */
function createTargetToPluginMapping(plugins) {
  return plugins.reduce(function (map, plugin) {
    return (0, _update["default"])(map, [plugin.target, plugin.mode], function (x) {
      return [].concat(_toConsumableArray(x || []), [plugin]);
    });
  }, {});
}
/** */


function connectPluginsToStore(plugins) {
  return plugins.map(function (plugin) {
    return _objectSpread(_objectSpread({}, plugin), {}, {
      component: connectPluginComponent(plugin)
    });
  });
}
/** */


function addPluginsToCompanionWindowsRegistry(plugins) {
  plugins.filter(function (p) {
    return p.companionWindowKey;
  }).forEach(function (plugin) {
    _CompanionWindowRegistry["default"][plugin.companionWindowKey] = plugin.component;
  });
  return _CompanionWindowRegistry["default"];
}
/** Connect plugin component to state */


function connectPluginComponent(plugin) {
  if (!plugin.mapStateToProps && !plugin.mapDispatchToProps) return plugin.component;
  return _reactRedux.connect.apply(void 0, [plugin.mapStateToProps, plugin.mapDispatchToProps].concat(_toConsumableArray(plugin.connectOptions || [])))(plugin.component);
}