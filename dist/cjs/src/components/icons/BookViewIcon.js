"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BookViewIcon;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * BookViewIcon ~
*/
function BookViewIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_SvgIcon["default"], props, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M1,4V21H22.853V4.1ZM3,19V6h8V19Zm18,0H13V6h8ZM14,9.5h6V11H14ZM14,12h6v1.5H14Zm0,2.5h6V16H14Z"
  })));
}