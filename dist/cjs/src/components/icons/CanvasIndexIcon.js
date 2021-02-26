"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CanvasIndexIcon;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Render the canvas index svg
 */
function CanvasIndexIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_SvgIcon["default"], props, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M6.924,21H21V19H6.924ZM3,17H21V15H3Zm3.924-4H21V11H6.924Zm0-4H21V7H6.924ZM3,3V5H21V3Z"
  })));
}