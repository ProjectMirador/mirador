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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';
/**
 */

export var WorkspaceExport = /*#__PURE__*/function (_Component) {
  _inherits(WorkspaceExport, _Component);

  var _super = _createSuper(WorkspaceExport);

  /** */
  function WorkspaceExport(props) {
    var _this;

    _classCallCheck(this, WorkspaceExport);

    _this = _super.call(this, props);
    _this.state = {
      copied: false
    };
    _this.onCopy = _this.onCopy.bind(_assertThisInitialized(_this));
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** Handle closing after the content is copied and the snackbar is done */


  _createClass(WorkspaceExport, [{
    key: "handleClose",
    value: function handleClose() {
      var handleClose = this.props.handleClose;
      handleClose();
    }
    /** Show the snackbar */

  }, {
    key: "onCopy",
    value: function onCopy() {
      this.setState({
        copied: true
      });
    }
    /**
     * @private
     */

  }, {
    key: "exportedState",
    value: function exportedState() {
      var exportableState = this.props.exportableState;
      return JSON.stringify(exportableState, null, 2);
    }
    /**
     * render
     * @return
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          container = _this$props.container,
          open = _this$props.open,
          t = _this$props.t;
      var copied = this.state.copied;

      if (copied) {
        return /*#__PURE__*/React.createElement(Snackbar, {
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'top'
          },
          open: true,
          autoHideDuration: 6000,
          onClose: this.handleClose,
          message: t('exportCopied'),
          action: /*#__PURE__*/React.createElement(IconButton, {
            size: "small",
            "aria-label": t('dismiss'),
            color: "inherit",
            onClick: this.handleClose
          }, /*#__PURE__*/React.createElement(CloseIcon, {
            fontSize: "small"
          }))
        });
      }

      return /*#__PURE__*/React.createElement(Dialog, {
        id: "workspace-settings",
        container: container,
        open: open,
        onClose: this.handleClose,
        scroll: "paper",
        fullWidth: true,
        maxWidth: "sm"
      }, /*#__PURE__*/React.createElement(DialogTitle, {
        id: "form-dialog-title",
        disableTypography: true
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "h2"
      }, t('downloadExport'))), /*#__PURE__*/React.createElement(ScrollIndicatedDialogContent, null, children, /*#__PURE__*/React.createElement("pre", null, this.exportedState())), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        onClick: this.handleClose
      }, t('cancel')), /*#__PURE__*/React.createElement(CopyToClipboard, {
        onCopy: this.onCopy,
        text: this.exportedState()
      }, /*#__PURE__*/React.createElement(Button, {
        variant: "contained",
        color: "primary"
      }, t('copy')))));
    }
  }]);

  return WorkspaceExport;
}(Component);
WorkspaceExport.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: function t(key) {
    return key;
  }
};