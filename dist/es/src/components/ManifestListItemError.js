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
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/ErrorOutlineSharp';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
/**
 * ManifestListItemError renders a component displaying a
 * message to the user about a problem loading a manifest
*/

export var ManifestListItemError = /*#__PURE__*/function (_Component) {
  _inherits(ManifestListItemError, _Component);

  var _super = _createSuper(ManifestListItemError);

  function ManifestListItemError() {
    _classCallCheck(this, ManifestListItemError);

    return _super.apply(this, arguments);
  }

  _createClass(ManifestListItemError, [{
    key: "render",
    value:
    /**
     * Returns the rendered component
    */
    function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          manifestId = _this$props.manifestId,
          onDismissClick = _this$props.onDismissClick,
          onTryAgainClick = _this$props.onTryAgainClick,
          t = _this$props.t;
      return /*#__PURE__*/React.createElement(Grid, {
        container: true
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true,
        item: true,
        xs: 12,
        sm: 6
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 4,
        sm: 3
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true,
        justify: "center"
      }, /*#__PURE__*/React.createElement(ErrorIcon, {
        className: classes.errorIcon
      }))), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 8,
        sm: 9
      }, /*#__PURE__*/React.createElement(Typography, null, t('manifestError')), /*#__PURE__*/React.createElement(Typography, {
        className: classes.manifestIdText
      }, manifestId)))), /*#__PURE__*/React.createElement(Grid, {
        container: true
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true,
        item: true,
        xs: 12,
        sm: 6,
        justify: "flex-end"
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement(Button, {
        onClick: function onClick() {
          onDismissClick(manifestId);
        }
      }, t('dismiss')), /*#__PURE__*/React.createElement(Button, {
        onClick: function onClick() {
          onTryAgainClick(manifestId);
        }
      }, t('tryAgain'))))));
    }
  }]);

  return ManifestListItemError;
}(Component);