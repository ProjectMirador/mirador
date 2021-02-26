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
import MenuIcon from '@material-ui/icons/MenuSharp';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/CloseSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';
/** */

export var MinimalWindow = /*#__PURE__*/function (_Component) {
  _inherits(MinimalWindow, _Component);

  var _super = _createSuper(MinimalWindow);

  function MinimalWindow() {
    _classCallCheck(this, MinimalWindow);

    return _super.apply(this, arguments);
  }

  _createClass(MinimalWindow, [{
    key: "render",
    value:
    /** */
    function render() {
      var _this$props = this.props,
          allowClose = _this$props.allowClose,
          allowWindowSideBar = _this$props.allowWindowSideBar,
          ariaLabel = _this$props.ariaLabel,
          children = _this$props.children,
          classes = _this$props.classes,
          label = _this$props.label,
          removeWindow = _this$props.removeWindow,
          t = _this$props.t,
          windowId = _this$props.windowId;
      return /*#__PURE__*/React.createElement(Paper, {
        component: "section",
        elevation: 1,
        id: windowId,
        className: cn(classes.window, ns('placeholder-window')),
        "aria-label": label && ariaLabel ? t('window', {
          label: label
        }) : null
      }, /*#__PURE__*/React.createElement(AppBar, {
        position: "relative",
        color: "default"
      }, /*#__PURE__*/React.createElement(Toolbar, {
        disableGutters: true,
        className: cn(classes.windowTopBarStyle, ns('window-top-bar')),
        variant: "dense"
      }, allowWindowSideBar && /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('toggleWindowSideBar'),
        disabled: true
      }, /*#__PURE__*/React.createElement(MenuIcon, null)), /*#__PURE__*/React.createElement(Typography, {
        variant: "h2",
        noWrap: true,
        color: "inherit",
        className: classes.title
      }, label), allowClose && removeWindow && /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('closeWindow'),
        className: cn(classes.button, ns('window-close')),
        onClick: removeWindow,
        TooltipProps: {
          tabIndex: ariaLabel ? '0' : '-1'
        }
      }, /*#__PURE__*/React.createElement(CloseIcon, null)))), children);
    }
  }]);

  return MinimalWindow;
}(Component);
MinimalWindow.defaultProps = {
  allowClose: true,
  allowWindowSideBar: true,
  ariaLabel: true,
  children: null,
  classes: {},
  label: '',
  removeWindow: function removeWindow() {},
  t: function t(key) {
    return key;
  }
};