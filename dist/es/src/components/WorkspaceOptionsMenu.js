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
import ImportIcon from '@material-ui/icons/Input';
import SaveAltIcon from '@material-ui/icons/SaveAltSharp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import WorkspaceExport from '../containers/WorkspaceExport';
import WorkspaceImport from '../containers/WorkspaceImport';
import { PluginHook } from './PluginHook';
import ns from '../config/css-ns';
/**
 * WorkspaceOptionsMenu ~ the menu for workspace options such as import/export
*/

export var WorkspaceOptionsMenu = /*#__PURE__*/function (_Component) {
  _inherits(WorkspaceOptionsMenu, _Component);

  var _super = _createSuper(WorkspaceOptionsMenu);

  /**
   * constructor -
   */
  function WorkspaceOptionsMenu(props) {
    var _this;

    _classCallCheck(this, WorkspaceOptionsMenu);

    _this = _super.call(this, props);
    _this.state = {
      exportWorkspace: {},
      importWorkspace: {}
    };
    _this.handleMenuItemClick = _this.handleMenuItemClick.bind(_assertThisInitialized(_this));
    _this.handleMenuItemClose = _this.handleMenuItemClose.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * @private
   */


  _createClass(WorkspaceOptionsMenu, [{
    key: "handleMenuItemClick",
    value: function handleMenuItemClick(item) {
      var obj = {};
      obj[item] = {};
      obj[item].open = true;
      this.setState(obj);
    }
    /**
     * @private
     */

  }, {
    key: "handleMenuItemClose",
    value: function handleMenuItemClose(item) {
      var _this2 = this;

      return function (event) {
        var obj = {};
        obj[item] = {};
        obj[item].open = false;

        _this2.setState(obj);
      };
    }
    /**
     * Returns the rendered component
    */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          anchorEl = _this$props.anchorEl,
          containerId = _this$props.containerId,
          handleClose = _this$props.handleClose,
          t = _this$props.t;
      var _this$state = this.state,
          exportWorkspace = _this$state.exportWorkspace,
          importWorkspace = _this$state.importWorkspace;
      var container = document.querySelector("#".concat(containerId, " .").concat(ns('viewer')));
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Menu, {
        id: "workspace-options-menu",
        container: container,
        anchorEl: anchorEl,
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        transformOrigin: {
          horizontal: 'left',
          vertical: 'top'
        },
        open: Boolean(anchorEl),
        onClose: handleClose
      }, /*#__PURE__*/React.createElement(MenuItem, {
        "aria-haspopup": "true",
        onClick: function onClick() {
          _this3.handleMenuItemClick('exportWorkspace');

          handleClose();
        },
        "aria-owns": exportWorkspace.open ? 'workspace-export' : undefined
      }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(SaveAltIcon, null)), /*#__PURE__*/React.createElement(Typography, {
        variant: "body1"
      }, t('downloadExportWorkspace'))), /*#__PURE__*/React.createElement(MenuItem, {
        "aria-haspopup": "true",
        id: "workspace-menu-import",
        onClick: function onClick() {
          _this3.handleMenuItemClick('importWorkspace');

          handleClose();
        },
        "aria-owns": exportWorkspace.open ? 'workspace-import' : undefined
      }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(ImportIcon, null)), /*#__PURE__*/React.createElement(Typography, {
        variant: "body1"
      }, t('importWorkspace'))), /*#__PURE__*/React.createElement(PluginHook, this.props)), Boolean(exportWorkspace.open) && /*#__PURE__*/React.createElement(WorkspaceExport, {
        open: Boolean(exportWorkspace.open),
        container: container,
        handleClose: this.handleMenuItemClose('exportWorkspace')
      }), Boolean(importWorkspace.open) && /*#__PURE__*/React.createElement(WorkspaceImport, {
        open: Boolean(importWorkspace.open),
        container: container,
        handleClose: this.handleMenuItemClose('importWorkspace')
      }));
    }
  }]);

  return WorkspaceOptionsMenu;
}(Component);
WorkspaceOptionsMenu.defaultProps = {
  anchorEl: null
};