"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WindowOptionsIcon;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * WindowMinIcon ~
*/
function WindowOptionsIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_SvgIcon["default"], props, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M0,0H24V24H0Z",
    fill: "none"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M24.852,17.981,3,18V15.945l21.852-.019Z",
    transform: "translate(-2 5)"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M1,4V21H22.853V4.1ZM3,19V6h8V19Zm18,0H13V6h8Z",
    transform: "translate(0 -2)"
  })));
}