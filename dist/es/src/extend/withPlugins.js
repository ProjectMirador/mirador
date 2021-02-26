function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useContext } from 'react';
import curry from 'lodash/curry';
import isEmpty from 'lodash/isEmpty';
import PluginContext from './PluginContext';
/** withPlugins should be the innermost HOC */

function _withPlugins(targetName, TargetComponent) {
  // eslint-disable-line no-underscore-dangle

  /** */
  function PluginHoc(props, ref) {
    var pluginMap = useContext(PluginContext);

    var passDownProps = _objectSpread(_objectSpread({}, props), ref ? {
      ref: ref
    } : {});

    var plugins = (pluginMap || {})[targetName];

    if (isEmpty(plugins) || isEmpty(plugins.wrap) && isEmpty(plugins.add)) {
      return /*#__PURE__*/React.createElement(TargetComponent, passDownProps);
    }

    var PluginComponents = (plugins.add || []).map(function (plugin) {
      return plugin.component;
    });
    var targetComponent = /*#__PURE__*/React.createElement(TargetComponent, Object.assign({}, passDownProps, {
      PluginComponents: PluginComponents
    }));
    if (isEmpty(plugins.wrap)) return targetComponent;
    /** */

    var pluginWrapper = function pluginWrapper(children, plugin) {
      var WrapPluginComponent = plugin.component;
      return /*#__PURE__*/React.createElement(WrapPluginComponent, Object.assign({
        targetProps: passDownProps
      }, passDownProps, {
        PluginComponents: PluginComponents,
        TargetComponent: TargetComponent
      }), children);
    };

    return plugins.wrap.slice().reverse().reduce(pluginWrapper, /*#__PURE__*/React.createElement(TargetComponent, passDownProps));
  }

  var whatever = /*#__PURE__*/React.forwardRef(PluginHoc);
  whatever.displayName = "WithPlugins(".concat(targetName, ")");
  return whatever;
}
/** withPlugins('MyComponent')(MyComponent) */


export var withPlugins = curry(_withPlugins);