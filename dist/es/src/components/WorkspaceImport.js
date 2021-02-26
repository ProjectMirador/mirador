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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogActions, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';
/**
 */

export var WorkspaceImport = /*#__PURE__*/function (_Component) {
  _inherits(WorkspaceImport, _Component);

  var _super = _createSuper(WorkspaceImport);

  /**
   *
   * constructor
   */
  function WorkspaceImport(props) {
    var _this;

    _classCallCheck(this, WorkspaceImport);

    _this = _super.call(this, props);
    _this.state = {
      configImportValue: ''
    };
    _this.handleImportConfig = _this.handleImportConfig.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * @private
   */


  _createClass(WorkspaceImport, [{
    key: "handleChange",
    value: function handleChange(event) {
      event.preventDefault();
      this.setState({
        configImportValue: event.target.value
      });
    }
    /**
     * @private
     */

  }, {
    key: "handleImportConfig",
    value: function handleImportConfig(event) {
      var _this$props = this.props,
          handleClose = _this$props.handleClose,
          importConfig = _this$props.importConfig;
      var configImportValue = this.state.configImportValue;

      try {
        var configJSON = JSON.parse(configImportValue);
        importConfig(configJSON);
        handleClose();
      } catch (ex) {
        var addError = this.props.addError;
        addError(ex.toString());
      }
    }
    /**
     * render
     * @return
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          handleClose = _this$props2.handleClose,
          open = _this$props2.open,
          t = _this$props2.t;
      return /*#__PURE__*/React.createElement(Dialog, {
        "aria-labelledby": "workspace-import-title",
        id: "workspace-import",
        onEscapeKeyDown: handleClose,
        onClose: handleClose,
        open: open,
        fullWidth: true,
        maxWidth: "sm"
      }, /*#__PURE__*/React.createElement(DialogTitle, {
        id: "workspace-import-title",
        disableTypography: true
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "h2"
      }, t('importWorkspace'))), /*#__PURE__*/React.createElement(ScrollIndicatedDialogContent, null, /*#__PURE__*/React.createElement(TextField, {
        className: classes.textField,
        id: "workspace-import-input",
        multiline: true,
        onChange: this.handleChange,
        rows: "15",
        variant: "filled",
        inputProps: {
          autoFocus: 'autofocus',
          className: classes.textInput
        },
        helperText: t('importWorkspaceHint')
      })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        className: classes.cancelBtn,
        onClick: handleClose
      }, t('cancel')), /*#__PURE__*/React.createElement(Button, {
        color: "primary",
        onClick: this.handleImportConfig,
        variant: "contained"
      }, t('import'))));
    }
  }]);

  return WorkspaceImport;
}(Component);
WorkspaceImport.defaultProps = {
  classes: {},
  open: false,
  t: function t(key) {
    return key;
  }
};