"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPlugins = void 0;

var _react = _interopRequireWildcard(require("react"));

var _curry = _interopRequireDefault(require("lodash/curry"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _PluginContext = _interopRequireDefault(require("./PluginContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** withPlugins should be the innermost HOC */
function _withPlugins(targetName, TargetComponent) {
  // eslint-disable-line no-underscore-dangle

  /** */
  function PluginHoc(props, ref) {
    var pluginMap = (0, _react.useContext)(_PluginContext["default"]);

    var passDownProps = _objectSpread(_objectSpread({}, props), ref ? {
      ref: ref
    } : {});

    var plugins = (pluginMap || {})[targetName];

    if ((0, _isEmpty["default"])(plugins) || (0, _isEmpty["default"])(plugins.wrap) && (0, _isEmpty["default"])(plugins.add)) {
      return /*#__PURE__*/_react["default"].createElement(TargetComponent, passDownProps);
    }

    var PluginComponents = (plugins.add || []).map(function (plugin) {
      return plugin.component;
    });

    var targetComponent = /*#__PURE__*/_react["default"].createElement(TargetComponent, Object.assign({}, passDownProps, {
      PluginComponents: PluginComponents
    }));

    if ((0, _isEmpty["default"])(plugins.wrap)) return targetComponent;
    /** */

    var pluginWrapper = function pluginWrapper(children, plugin) {
      var WrapPluginComponent = plugin.component;
      return /*#__PURE__*/_react["default"].createElement(WrapPluginComponent, Object.assign({
        targetProps: passDownProps
      }, passDownProps, {
        PluginComponents: PluginComponents,
        TargetComponent: TargetComponent
      }), children);
    };

    return plugins.wrap.slice().reverse().reduce(pluginWrapper, /*#__PURE__*/_react["default"].createElement(TargetComponent, passDownProps));
  }

  var whatever = /*#__PURE__*/_react["default"].forwardRef(PluginHoc);

  whatever.displayName = "WithPlugins(".concat(targetName, ")");
  return whatever;
}
/** withPlugins('MyComponent')(MyComponent) */


var withPlugins = (0, _curry["default"])(_withPlugins);
exports.withPlugins = withPlugins;