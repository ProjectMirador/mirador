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
import MoreVertIcon from '@material-ui/icons/MoreVertSharp';
import Menu from '@material-ui/core/Menu';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import { PluginHook } from './PluginHook';
import ns from '../config/css-ns';
/**
 *
 */

export var WindowTopBarPluginMenu = /*#__PURE__*/function (_Component) {
  _inherits(WindowTopBarPluginMenu, _Component);

  var _super = _createSuper(WindowTopBarPluginMenu);

  /**
   * constructor -
   */
  function WindowTopBarPluginMenu(props) {
    var _this;

    _classCallCheck(this, WindowTopBarPluginMenu);

    _this = _super.call(this, props);
    _this.state = {
      anchorEl: null
    };
    _this.handleMenuClick = _this.handleMenuClick.bind(_assertThisInitialized(_this));
    _this.handleMenuClose = _this.handleMenuClose.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * Set the anchorEl state to the click target
   */


  _createClass(WindowTopBarPluginMenu, [{
    key: "handleMenuClick",
    value: function handleMenuClick(event) {
      this.setState({
        anchorEl: event.currentTarget
      });
    }
    /**
     * Set the anchorEl state to null (closing the menu)
     */

  }, {
    key: "handleMenuClose",
    value: function handleMenuClose() {
      this.setState({
        anchorEl: null
      });
    }
    /**
     * render component
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          classes = _this$props.classes,
          containerId = _this$props.containerId,
          PluginComponents = _this$props.PluginComponents,
          t = _this$props.t,
          windowId = _this$props.windowId,
          menuIcon = _this$props.menuIcon;
      var anchorEl = this.state.anchorEl;
      if (!PluginComponents || PluginComponents.length === 0) return /*#__PURE__*/React.createElement(React.Fragment, null);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-haspopup": "true",
        "aria-label": t('windowPluginMenu'),
        "aria-owns": anchorEl ? "window-plugin-menu_".concat(windowId) : undefined,
        className: anchorEl ? classes.ctrlBtnSelected : null,
        onClick: this.handleMenuClick
      }, menuIcon), /*#__PURE__*/React.createElement(Menu, {
        id: "window-plugin-menu_".concat(windowId),
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
        onClose: function onClose() {
          return _this2.handleMenuClose();
        }
      }, /*#__PURE__*/React.createElement(PluginHook, Object.assign({
        handleClose: function handleClose() {
          return _this2.handleMenuClose();
        }
      }, this.props))));
    }
  }]);

  return WindowTopBarPluginMenu;
}(Component);
WindowTopBarPluginMenu.defaultProps = {
  classes: {},
  menuIcon: /*#__PURE__*/React.createElement(MoreVertIcon, null),
  PluginComponents: []
};