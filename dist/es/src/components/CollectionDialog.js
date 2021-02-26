function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
import { Button, Chip, Dialog, DialogActions, DialogTitle, Link, MenuList, MenuItem, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBackSharp';
import Skeleton from '@material-ui/lab/Skeleton';
import { LabelValueMetadata } from './LabelValueMetadata';
import CollapsibleSection from '../containers/CollapsibleSection';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';
import ManifestInfo from '../containers/ManifestInfo';
/**
 */

function asArray(value) {
  if (!Array.isArray(value)) {
    return [value];
  }

  return value;
}
/**
 * a dialog providing the possibility to select the collection
 */


export var CollectionDialog = /*#__PURE__*/function (_Component) {
  _inherits(CollectionDialog, _Component);

  var _super = _createSuper(CollectionDialog);

  /** */
  function CollectionDialog(props) {
    var _this;

    _classCallCheck(this, CollectionDialog);

    _this = _super.call(this, props);
    _this.state = {
      filter: null
    };
    _this.hideDialog = _this.hideDialog.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** */


  _createClass(CollectionDialog, [{
    key: "setFilter",
    value: function setFilter(filter) {
      this.setState({
        filter: filter
      });
    }
    /** */

  }, {
    key: "hideDialog",
    value: function hideDialog() {
      var _this$props = this.props,
          hideCollectionDialog = _this$props.hideCollectionDialog,
          windowId = _this$props.windowId;
      hideCollectionDialog(windowId);
    }
    /** */

  }, {
    key: "selectCollection",
    value: function selectCollection(c) {
      var _this$props2 = this.props,
          collectionPath = _this$props2.collectionPath,
          manifestId = _this$props2.manifestId,
          showCollectionDialog = _this$props2.showCollectionDialog,
          windowId = _this$props2.windowId;
      showCollectionDialog(c.id, [].concat(_toConsumableArray(collectionPath), [manifestId]), windowId);
    }
    /** */

  }, {
    key: "goToPreviousCollection",
    value: function goToPreviousCollection() {
      var _this$props3 = this.props,
          collectionPath = _this$props3.collectionPath,
          showCollectionDialog = _this$props3.showCollectionDialog,
          windowId = _this$props3.windowId;
      showCollectionDialog(collectionPath[collectionPath.length - 1], collectionPath.slice(0, -1), windowId);
    }
    /** */

  }, {
    key: "selectManifest",
    value: function selectManifest(m) {
      var _this$props4 = this.props,
          addWindow = _this$props4.addWindow,
          collectionPath = _this$props4.collectionPath,
          manifestId = _this$props4.manifestId,
          setWorkspaceAddVisibility = _this$props4.setWorkspaceAddVisibility,
          updateWindow = _this$props4.updateWindow,
          windowId = _this$props4.windowId;

      if (windowId) {
        updateWindow(windowId, {
          canvasId: null,
          collectionPath: [].concat(_toConsumableArray(collectionPath), [manifestId]),
          manifestId: m.id
        });
      } else {
        addWindow({
          collectionPath: [].concat(_toConsumableArray(collectionPath), [manifestId]),
          manifestId: m.id
        });
      }

      this.hideDialog();
      setWorkspaceAddVisibility(false);
    }
    /** */

  }, {
    key: "dialogContainer",
    value: function dialogContainer() {
      var _this$props5 = this.props,
          containerId = _this$props5.containerId,
          windowId = _this$props5.windowId;
      return document.querySelector("#".concat(containerId, " #").concat(windowId));
    }
    /** */

  }, {
    key: "placeholder",
    value: function placeholder() {
      var classes = this.props.classes;
      return /*#__PURE__*/React.createElement(Dialog, {
        className: classes.dialog,
        onClose: this.hideDialog,
        open: true,
        container: this.dialogContainer(),
        BackdropProps: this.backdropProps()
      }, /*#__PURE__*/React.createElement(DialogTitle, {
        id: "select-collection",
        disableTypography: true
      }, /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      })), /*#__PURE__*/React.createElement(ScrollIndicatedDialogContent, null, /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      }), /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      })));
    }
    /** */

  }, {
    key: "backdropProps",
    value: function backdropProps() {
      var classes = this.props.classes;
      return {
        classes: {
          root: classes.dialog
        }
      };
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props6 = this.props,
          classes = _this$props6.classes,
          collection = _this$props6.collection,
          error = _this$props6.error,
          isMultipart = _this$props6.isMultipart,
          manifest = _this$props6.manifest,
          ready = _this$props6.ready,
          t = _this$props6.t;
      var filter = this.state.filter;
      if (error) return null; // If this component is optimistically rendering ahead of the window its in
      // force a re-render so that it is placed correctly. The right thing here is
      // to maybe pass a ref.

      if (!this.dialogContainer()) {
        this.forceUpdate();
        return /*#__PURE__*/React.createElement(React.Fragment, null);
      }

      if (!ready) return this.placeholder();
      var rights = manifest && asArray(manifest.getProperty('rights') || manifest.getProperty('license'));
      var requiredStatement = manifest && asArray(manifest.getRequiredStatement()).filter(function (l) {
        return l.getValue();
      }).map(function (labelValuePair) {
        return {
          label: null,
          values: labelValuePair.getValues()
        };
      });
      var collections = manifest.getCollections();
      var currentFilter = filter || (collections.length > 0 ? 'collections' : 'manifests');
      return /*#__PURE__*/React.createElement(Dialog, {
        className: classes.dialog,
        onClose: this.hideDialog,
        container: this.dialogContainer(),
        BackdropProps: this.backdropProps(),
        open: true
      }, /*#__PURE__*/React.createElement(DialogTitle, {
        id: "select-collection",
        disableTypography: true
      }, /*#__PURE__*/React.createElement(Typography, {
        component: "div",
        variant: "overline"
      }, t(isMultipart ? 'multipartCollection' : 'collection')), /*#__PURE__*/React.createElement(Typography, {
        variant: "h3"
      }, CollectionDialog.getUseableLabel(manifest))), /*#__PURE__*/React.createElement(ScrollIndicatedDialogContent, {
        className: classes.dialogContent
      }, collection && /*#__PURE__*/React.createElement(Button, {
        startIcon: /*#__PURE__*/React.createElement(ArrowBackIcon, null),
        onClick: function onClick() {
          return _this2.goToPreviousCollection();
        }
      }, CollectionDialog.getUseableLabel(collection)), /*#__PURE__*/React.createElement("div", {
        className: classes.collectionMetadata
      }, /*#__PURE__*/React.createElement(ManifestInfo, {
        manifestId: manifest.id
      }), /*#__PURE__*/React.createElement(CollapsibleSection, {
        id: "select-collection-rights",
        label: t('attributionTitle')
      }, requiredStatement && /*#__PURE__*/React.createElement(LabelValueMetadata, {
        labelValuePairs: requiredStatement,
        defaultLabel: t('attribution')
      }), rights && rights.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('rights')), rights.map(function (v) {
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "body1",
          component: "dd",
          key: v
        }, /*#__PURE__*/React.createElement(Link, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: v
        }, v));
      })))), /*#__PURE__*/React.createElement("div", {
        className: classes.collectionFilter
      }, manifest.getTotalCollections() > 0 && /*#__PURE__*/React.createElement(Chip, {
        clickable: true,
        color: currentFilter === 'collections' ? 'primary' : 'default',
        onClick: function onClick() {
          return _this2.setFilter('collections');
        },
        label: t('totalCollections', {
          count: manifest.getTotalCollections()
        })
      }), manifest.getTotalManifests() > 0 && /*#__PURE__*/React.createElement(Chip, {
        clickable: true,
        color: currentFilter === 'manifests' ? 'primary' : 'default',
        onClick: function onClick() {
          return _this2.setFilter('manifests');
        },
        label: t('totalManifests', {
          count: manifest.getTotalManifests()
        })
      })), currentFilter === 'collections' && /*#__PURE__*/React.createElement(MenuList, null, collections.map(function (c) {
        return /*#__PURE__*/React.createElement(MenuItem, {
          key: c.id,
          onClick: function onClick() {
            _this2.selectCollection(c);
          }
        }, CollectionDialog.getUseableLabel(c));
      })), currentFilter === 'manifests' && /*#__PURE__*/React.createElement(MenuList, null, manifest.getManifests().map(function (m) {
        return /*#__PURE__*/React.createElement(MenuItem, {
          key: m.id,
          onClick: function onClick() {
            _this2.selectManifest(m);
          }
        }, CollectionDialog.getUseableLabel(m));
      }))), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        onClick: this.hideDialog
      }, t('close'))));
    }
  }], [{
    key: "getUseableLabel",
    value:
    /** */
    function getUseableLabel(resource, index) {
      return resource && resource.getLabel && resource.getLabel().length > 0 ? resource.getLabel().getValue() : String(index + 1);
    }
  }]);

  return CollectionDialog;
}(Component);
CollectionDialog.defaultProps = {
  collection: null,
  collectionPath: [],
  containerId: null,
  error: null,
  isMultipart: false,
  ready: false,
  windowId: null
};