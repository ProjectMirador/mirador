import React from 'react';
import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';
/** invisible area where background plugins can add to */

export var BackgroundPluginArea = function BackgroundPluginArea(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: ns('background-plugin-area'),
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement(PluginHook, props));
};
BackgroundPluginArea.defaultProps = {
  PluginComponents: []
};