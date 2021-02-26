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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PluginHook } from './PluginHook';
/** */

export var ErrorContent = /*#__PURE__*/function (_Component) {
  _inherits(ErrorContent, _Component);

  var _super = _createSuper(ErrorContent);

  function ErrorContent() {
    _classCallCheck(this, ErrorContent);

    return _super.apply(this, arguments);
  }

  _createClass(ErrorContent, [{
    key: "render",
    value:
    /** */
    function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          error = _this$props.error,
          metadata = _this$props.metadata,
          showJsError = _this$props.showJsError,
          t = _this$props.t;
      if (!showJsError) return null;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Alert, {
        elevation: 6,
        variant: "filled",
        severity: "error"
      }, t('errorDialogTitle')), showJsError && /*#__PURE__*/React.createElement(Accordion, {
        square: true,
        className: classes.alert
      }, /*#__PURE__*/React.createElement(AccordionSummary, {
        expandIcon: /*#__PURE__*/React.createElement(ExpandMoreIcon, null)
      }, /*#__PURE__*/React.createElement(Typography, null, t('jsError', {
        message: error.message,
        name: error.name
      }))), /*#__PURE__*/React.createElement(AccordionDetails, {
        className: classes.details
      }, /*#__PURE__*/React.createElement("pre", null, t('jsStack', {
        stack: error.stack
      })), metadata && /*#__PURE__*/React.createElement("pre", null, JSON.stringify(metadata, null, 2)))), /*#__PURE__*/React.createElement(PluginHook, this.props));
    }
  }]);

  return ErrorContent;
}(Component);
ErrorContent.defaultProps = {
  metadata: null,
  showJsError: true,
  t: function t(key) {
    return key;
  }
};