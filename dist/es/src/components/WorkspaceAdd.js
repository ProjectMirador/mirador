function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

import React from 'react';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/AddSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreSharp';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ns from '../config/css-ns';
import ManifestForm from '../containers/ManifestForm';
import ManifestListItem from '../containers/ManifestListItem';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import { IIIFDropTarget } from './IIIFDropTarget';
import { PluginHook } from './PluginHook';
/**
 * An area for managing manifests and adding them to workspace
 * @memberof Workspace
 * @private
 */

export var WorkspaceAdd = /*#__PURE__*/function (_React$Component) {
  _inherits(WorkspaceAdd, _React$Component);

  var _super = _createSuper(WorkspaceAdd);

  /** */
  function WorkspaceAdd(props) {
    var _this;

    _classCallCheck(this, WorkspaceAdd);

    _this = _super.call(this, props);
    _this.state = {
      addResourcesOpen: false
    };
    _this.ref = /*#__PURE__*/React.createRef();
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.setAddResourcesVisibility = _this.setAddResourcesVisibility.bind(_assertThisInitialized(_this));
    _this.handleDrop = _this.handleDrop.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** */


  _createClass(WorkspaceAdd, [{
    key: "handleDrop",
    value: function handleDrop(_ref, props, monitor) {
      var manifestId = _ref.manifestId,
          manifestJson = _ref.manifestJson;
      var addResource = this.props.addResource;

      if (manifestJson) {
        addResource(manifestId, manifestJson, {
          provider: 'file'
        });
      } else {
        addResource(manifestId);
      }

      this.scrollToTop();
    }
    /** @private */

  }, {
    key: "onSubmit",
    value: function onSubmit() {
      this.setAddResourcesVisibility(false);
      this.scrollToTop();
    }
    /**
     * @private
     */

  }, {
    key: "setAddResourcesVisibility",
    value: function setAddResourcesVisibility(bool) {
      this.setState({
        addResourcesOpen: bool
      });
    }
    /** Scroll the list back to the top */

  }, {
    key: "scrollToTop",
    value: function scrollToTop() {
      if (this.ref.current) {
        var el = this.ref.current;
        el.scrollTo({
          behavior: 'smooth',
          left: 0,
          top: 0
        });
      }
    }
    /**
     * render
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          catalog = _this$props.catalog,
          setWorkspaceAddVisibility = _this$props.setWorkspaceAddVisibility,
          t = _this$props.t,
          classes = _this$props.classes;
      var addResourcesOpen = this.state.addResourcesOpen;
      console.log(catalog);
      var manifestList = catalog.map(function (resource, index) {
        return /*#__PURE__*/React.createElement(ManifestListItem, Object.assign({}, index === 0 && {
          buttonRef: function buttonRef(ref) {
            return ref && ref.focus();
          }
        }, {
          key: resource.manifestId,
          manifestId: resource.manifestId,
          provider: resource.provider,
          tileFormat: resource.tileFormat,
          handleClose: function handleClose() {
            return setWorkspaceAddVisibility(false);
          }
        }));
      });
      return /*#__PURE__*/React.createElement(IIIFDropTarget, {
        onDrop: this.handleDrop
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.ref,
        className: classNames(ns('workspace-add'), classes.workspaceAdd)
      }, catalog.length < 1 ? /*#__PURE__*/React.createElement(Grid, {
        alignItems: "center",
        container: true,
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/React.createElement(Grid, {
        xs: 12,
        item: true
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "h1",
        component: "div",
        align: "center"
      }, t('emptyResourceList')))) : /*#__PURE__*/React.createElement(Paper, {
        className: classes.list
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "srOnly",
        component: "h1"
      }, t('miradorResources')), /*#__PURE__*/React.createElement(PluginHook, this.props), /*#__PURE__*/React.createElement(List, {
        disablePadding: true
      }, manifestList)), /*#__PURE__*/React.createElement(Fab, {
        variant: "extended",
        disabled: addResourcesOpen,
        className: classNames(classes.fab, ns('add-resource-button')),
        color: "primary",
        onClick: function onClick() {
          return _this2.setAddResourcesVisibility(true);
        }
      }, /*#__PURE__*/React.createElement(AddIcon, null), t('addResource')), /*#__PURE__*/React.createElement(Drawer, {
        className: classNames(_defineProperty({}, classes.displayNone, !addResourcesOpen)),
        classes: {
          paper: classes.paper
        },
        variant: "persistent",
        anchor: "bottom",
        open: addResourcesOpen,
        ModalProps: {
          disablePortal: true,
          hideBackdrop: true,
          style: {
            position: 'absolute'
          }
        }
      }, /*#__PURE__*/React.createElement(Paper, {
        className: classes.form
      }, /*#__PURE__*/React.createElement(AppBar, {
        position: "absolute",
        color: "primary",
        onClick: function onClick() {
          return _this2.setAddResourcesVisibility(false);
        }
      }, /*#__PURE__*/React.createElement(Toolbar, {
        variant: "dense"
      }, /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('closeAddResourceForm'),
        className: classes.menuButton,
        color: "inherit"
      }, /*#__PURE__*/React.createElement(ExpandMoreIcon, null)), /*#__PURE__*/React.createElement(Typography, {
        variant: "h2",
        noWrap: true,
        color: "inherit",
        className: classes.typographyBody
      }, t('addResource')))), /*#__PURE__*/React.createElement(ManifestForm, {
        addResourcesOpen: addResourcesOpen,
        onSubmit: this.onSubmit,
        onCancel: function onCancel() {
          return _this2.setAddResourcesVisibility(false);
        }
      })))));
    }
  }]);

  return WorkspaceAdd;
}(React.Component);
WorkspaceAdd.defaultProps = {
  addResource: function addResource() {},
  catalog: [],
  classes: {},
  t: function t(key) {
    return key;
  }
};