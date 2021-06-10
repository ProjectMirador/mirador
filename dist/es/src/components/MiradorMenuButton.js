function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ns from '../config/css-ns';
/**
 * MiradorMenuButton ~ Wrap the given icon prop in an IconButton and a Tooltip.
 * This shares the passed in aria-label w/ the Tooltip (as title) and the IconButton
 * All props besides icon are spread to the IconButton component
*/

export function MiradorMenuButton(props) {
  var ariaLabel = props['aria-label'];

  var badge = props.badge,
      children = props.children,
      containerId = props.containerId,
      dispatch = props.dispatch,
      BadgeProps = props.BadgeProps,
      TooltipProps = props.TooltipProps,
      iconButtonProps = _objectWithoutProperties(props, ["badge", "children", "containerId", "dispatch", "BadgeProps", "TooltipProps"]);

  var button = /*#__PURE__*/React.createElement(IconButton, iconButtonProps, badge ? /*#__PURE__*/React.createElement(Badge, BadgeProps, children) : children);
  if (iconButtonProps.disabled) return button;
  return /*#__PURE__*/React.createElement(Tooltip, Object.assign({
    PopperProps: {
      container: document.querySelector("#".concat(containerId, " .").concat(ns('viewer')))
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