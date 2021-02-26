function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React, { Component } from 'react';
import Menu from '@material-ui/core//Menu';
import ListSubheader from '@material-ui/core/ListSubheader';
import WindowThumbnailSettings from '../containers/WindowThumbnailSettings';
import WindowViewSettings from '../containers/WindowViewSettings';
import { PluginHook } from './PluginHook';
import ns from '../config/css-ns';
/** Renders plugins */

function PluginHookWithHeader(props) {
  var PluginComponents = props.PluginComponents,
      t = props.t; // eslint-disable-line react/prop-types

  return PluginComponents ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ListSubheader, {
    role: "presentation",
    disableSticky: true,
    tabIndex: "-1"
  }, t('windowPluginButtons')), /*#__PURE__*/React.createElement(PluginHook, props)) : null;
}
/**
 */


export var WindowTopMenu = /*#__PURE__*/function (_Component) {
  _inherits(WindowTopMenu, _Component);

  var _super = _createSuper(WindowTopMenu);

  function WindowTopMenu() {
    _classCallCheck(this, WindowTopMenu);

    return _super.apply(this, arguments);
  }

  _createClass(WindowTopMenu, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
          containerId = _this$props.containerId,
          handleClose = _this$props.handleClose,
          anchorEl = _this$props.anchorEl,
          showThumbnailNavigationSettings = _this$props.showThumbnailNavigationSettings,
          toggleDraggingEnabled = _this$props.toggleDraggingEnabled,
          windowId = _this$props.windowId;
      return /*#__PURE__*/React.createElement(Menu, {
        id: "window-menu_".concat(windowId),
        container: document.querySelector("#".concat(containerId, " .").concat(ns('viewer'))),
        anchorEl: anchorEl,
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom'
        },
        transformOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        getContentAnchorEl: null,
        open: Boolean(anchorEl),
        onClose: handleClose,
        onEntering: toggleDraggingEnabled,
        onExit: toggleDraggingEnabled,
        orientation: "horizontal"
      }, /*#__PURE__*/React.createElement(WindowViewSettings, {
        windowId: windowId,
        handleClose: handleClose
      }), showThumbnailNavigationSettings && /*#__PURE__*/React.createElement(WindowThumbnailSettings, {
        windowId: windowId,
        handleClose: handleClose
      }), /*#__PURE__*/React.createElement(PluginHookWithHeader, this.props));
    }
  }]);

  return WindowTopMenu;
}(Component);
WindowTopMenu.defaultProps = {
  anchorEl: null,
  showThumbnailNavigationSettings: true
};