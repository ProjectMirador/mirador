"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MiradorIcon;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * ThumbnailNavigationRightIcon ~
*/
function MiradorIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_SvgIcon["default"], Object.assign({
    viewBox: "0 0 60 55"
  }, props), /*#__PURE__*/_react["default"].createElement("rect", {
    width: "18",
    height: "55"
  }), /*#__PURE__*/_react["default"].createElement("rect", {
    width: "18",
    height: "55",
    transform: "translate(42)"
  }), /*#__PURE__*/_react["default"].createElement("rect", {
    width: "18",
    height: "34",
    transform: "translate(21)"
  }));
}