function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
/** Renders plugins */

export var PluginHook = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var PluginComponents = props.PluginComponents; // eslint-disable-line react/prop-types

  var classes = props.classes,
      otherProps = _objectWithoutProperties(props, ["classes"]); // eslint-disable-line react/prop-types


  return PluginComponents ? PluginComponents.map(function (PluginComponent, index) {
    return (// eslint-disable-line react/prop-types

      /*#__PURE__*/
      React.isValidElement(PluginComponent) ? /*#__PURE__*/React.cloneElement(PluginComponent, _objectSpread(_objectSpread({}, otherProps), {}, {
        ref: ref
      })) : /*#__PURE__*/React.createElement(PluginComponent, Object.assign({
        ref: ref
      }, otherProps, {
        key: index // eslint-disable-line react/no-array-index-key

      }))
    );
  }) : null;
});