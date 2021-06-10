"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ThumbnailNavigationRightIcon;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * ThumbnailNavigationRightIcon ~
*/
function ThumbnailNavigationRightIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_SvgIcon["default"], props, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M0,0H24V24H0Z",
    transform: "translate(24) rotate(90)",
    fill: "none"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M3,3H21V5H3Z",
    transform: "translate(24) rotate(90)"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M19,3H5V21H19ZM17,19H7V5H17Z",
    transform: "translate(-2)"
  })));
}