"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundPluginArea = void 0;

var _react = _interopRequireDefault(require("react"));

var _cssNs = _interopRequireDefault(require("../config/css-ns"));

var _PluginHook = require("./PluginHook");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** invisible area where background plugins can add to */
var BackgroundPluginArea = function BackgroundPluginArea(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _cssNs["default"])('background-plugin-area'),
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, props));
};

exports.BackgroundPluginArea = BackgroundPluginArea;
BackgroundPluginArea.defaultProps = {
  PluginComponents: []
};