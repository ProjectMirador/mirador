"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiradorMenuButton = MiradorMenuButton;

var _react = _interopRequireDefault(require("react"));

var _Badge = _interopRequireDefault(require("@material-ui/core/Badge"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _cssNs = _interopRequireDefault(require("../config/css-ns"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * MiradorMenuButton ~ Wrap the given icon prop in an IconButton and a Tooltip.
 * This shares the passed in aria-label w/ the Tooltip (as title) and the IconButton
 * All props besides icon are spread to the IconButton component
*/
function MiradorMenuButton(props) {
  var ariaLabel = props['aria-label'];

  var badge = props.badge,
      children = props.children,
      containerId = props.containerId,
      dispatch = props.dispatch,
      BadgeProps = props.BadgeProps,
      TooltipProps = props.TooltipProps,
      iconButtonProps = _objectWithoutProperties(props, ["badge", "children", "containerId", "dispatch", "BadgeProps", "TooltipProps"]);

  var button = /*#__PURE__*/_react["default"].createElement(_IconButton["default"], iconButtonProps, badge ? /*#__PURE__*/_react["default"].createElement(_Badge["default"], BadgeProps, children) : children);

  if (iconButtonProps.disabled) return button;
  return /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], Object.assign({
    PopperProps: {
      container: document.querySelector("#".concat(containerId, " .").concat((0, _cssNs["default"])('viewer')))
    },
    title: ariaLabel
  }, TooltipProps), button);
}

MiradorMenuButton.defaultProps = {
  badge: false,
  BadgeProps: {},
  dispatch: function dispatch() {},
  TooltipProps: {}
};