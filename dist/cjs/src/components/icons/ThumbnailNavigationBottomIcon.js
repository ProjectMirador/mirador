"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ThumbnailNavigationBottomIcon;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * ThumbnailNavigationBottomIcon ~
*/
function ThumbnailNavigationBottomIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_SvgIcon["default"], props, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M3,3H21V5H3Z",
    transform: "translate(0 16)"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M21,5H3V19H21ZM19,17H5V7H19Z",
    transform: "translate(0 -2)"
  })));
}