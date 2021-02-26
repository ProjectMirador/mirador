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
import { AccessTokenSender } from './AccessTokenSender';
import { NewWindow } from './NewWindow';
import WindowAuthenticationBar from '../containers/WindowAuthenticationBar';
/**
 * Opens a new window for click
 */

export var IIIFAuthentication = /*#__PURE__*/function (_Component) {
  _inherits(IIIFAuthentication, _Component);

  var _super = _createSuper(IIIFAuthentication);

  /** */
  function IIIFAuthentication(props) {
    var _this;

    _classCallCheck(this, IIIFAuthentication);

    _this = _super.call(this, props);
    _this.performLogout = _this.performLogout.bind(_assertThisInitialized(_this));
    _this.onReceiveAccessTokenMessage = _this.onReceiveAccessTokenMessage.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** */


  _createClass(IIIFAuthentication, [{
    key: "onReceiveAccessTokenMessage",
    value: function onReceiveAccessTokenMessage(payload) {
      var _this$props = this.props,
          authServiceId = _this$props.authServiceId,
          accessTokenServiceId = _this$props.accessTokenServiceId,
          resolveAccessTokenRequest = _this$props.resolveAccessTokenRequest;
      resolveAccessTokenRequest(authServiceId, accessTokenServiceId, payload);
    }
    /** */

  }, {
    key: "defaultAuthBarProps",
    value: function defaultAuthBarProps() {
      var _this$props2 = this.props,
          authServiceId = _this$props2.authServiceId,
          windowId = _this$props2.windowId,
          status = _this$props2.status,
          logoutServiceId = _this$props2.logoutServiceId;
      return {
        authServiceId: authServiceId,
        hasLogoutService: !!logoutServiceId,
        status: status,
        windowId: windowId
      };
    }
    /** handle the IIIF logout workflow */

  }, {
    key: "performLogout",
    value: function performLogout() {
      var _this$props3 = this.props,
          accessTokenServiceId = _this$props3.accessTokenServiceId,
          authServiceId = _this$props3.authServiceId,
          features = _this$props3.features,
          logoutServiceId = _this$props3.logoutServiceId,
          resetAuthenticationState = _this$props3.resetAuthenticationState,
          openWindow = _this$props3.openWindow;
      openWindow(logoutServiceId, undefined, features);
      resetAuthenticationState({
        authServiceId: authServiceId,
        tokenServiceId: accessTokenServiceId
      });
    }
    /** Render the auth bar for logged in users */

  }, {
    key: "renderLoggedIn",
    value: function renderLoggedIn() {
      var _this$props4 = this.props,
          isInteractive = _this$props4.isInteractive,
          logoutConfirm = _this$props4.logoutConfirm,
          t = _this$props4.t;
      if (!isInteractive) return null;
      return /*#__PURE__*/React.createElement(WindowAuthenticationBar, Object.assign({
        confirmButton: logoutConfirm || t('logout'),
        onConfirm: this.performLogout
      }, this.defaultAuthBarProps()));
    }
    /** Render whatever shows up after the interactive login attempt fails */

  }, {
    key: "renderFailure",
    value: function renderFailure() {
      var _this$props5 = this.props,
          handleAuthInteraction = _this$props5.handleAuthInteraction,
          header = _this$props5.failureHeader,
          description = _this$props5.failureDescription,
          t = _this$props5.t,
          authServiceId = _this$props5.authServiceId,
          windowId = _this$props5.windowId;
      return /*#__PURE__*/React.createElement(WindowAuthenticationBar, Object.assign({
        header: header,
        description: description,
        confirmButton: t('retry'),
        onConfirm: function onConfirm() {
          return handleAuthInteraction(windowId, authServiceId);
        }
      }, this.defaultAuthBarProps()));
    }
    /** Render the login bar after we're logging in */

  }, {
    key: "renderLoggingInCookie",
    value: function renderLoggingInCookie() {
      var _this$props6 = this.props,
          accessTokenServiceId = _this$props6.accessTokenServiceId,
          authServiceId = _this$props6.authServiceId,
          resolveAuthenticationRequest = _this$props6.resolveAuthenticationRequest,
          features = _this$props6.features;
      return /*#__PURE__*/React.createElement(React.Fragment, null, this.renderLogin(), /*#__PURE__*/React.createElement(NewWindow, {
        name: "IiifLoginSender",
        url: "".concat(authServiceId, "?origin=").concat(window.origin),
        features: features,
        onClose: function onClose() {
          return resolveAuthenticationRequest(authServiceId, accessTokenServiceId);
        }
      }));
    }
    /** Render the login bar after we're logging in */

  }, {
    key: "renderLoggingInToken",
    value: function renderLoggingInToken() {
      var accessTokenServiceId = this.props.accessTokenServiceId;
      return /*#__PURE__*/React.createElement(React.Fragment, null, this.renderLogin(), /*#__PURE__*/React.createElement(AccessTokenSender, {
        handleAccessTokenMessage: this.onReceiveAccessTokenMessage,
        url: accessTokenServiceId
      }));
    }
    /** Render a login bar */

  }, {
    key: "renderLogin",
    value: function renderLogin() {
      var _this$props7 = this.props,
          confirm = _this$props7.confirm,
          description = _this$props7.description,
          handleAuthInteraction = _this$props7.handleAuthInteraction,
          header = _this$props7.header,
          isInteractive = _this$props7.isInteractive,
          label = _this$props7.label,
          authServiceId = _this$props7.authServiceId,
          windowId = _this$props7.windowId;
      if (!isInteractive) return null;
      return /*#__PURE__*/React.createElement(WindowAuthenticationBar, Object.assign({
        header: header,
        description: description,
        label: label,
        confirmButton: confirm,
        onConfirm: function onConfirm() {
          return handleAuthInteraction(windowId, authServiceId);
        }
      }, this.defaultAuthBarProps()));
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
          authServiceId = _this$props8.authServiceId,
          status = _this$props8.status;
      if (!authServiceId) return null;
      if (status === null) return this.renderLogin();
      if (status === 'cookie') return this.renderLoggingInCookie();
      if (status === 'token') return this.renderLoggingInToken();
      if (status === 'failed') return this.renderFailure();
      if (status === 'ok') return this.renderLoggedIn();
      return null;
    }
  }]);

  return IIIFAuthentication;
}(Component);
IIIFAuthentication.defaultProps = {
  confirm: undefined,
  description: undefined,
  failureDescription: undefined,
  failureHeader: undefined,
  features: 'centerscreen',
  header: undefined,
  isInteractive: true,
  label: undefined,
  logoutConfirm: undefined,
  logoutServiceId: undefined,
  openWindow: window.open,
  status: null,
  t: function t(k) {
    return k;
  }
};