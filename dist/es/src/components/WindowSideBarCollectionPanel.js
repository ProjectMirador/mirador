function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpwardSharp';
import CompanionWindow from '../containers/CompanionWindow';
import IIIFThumbnail from '../containers/IIIFThumbnail';
/** */

export var WindowSideBarCollectionPanel = /*#__PURE__*/function (_Component) {
  _inherits(WindowSideBarCollectionPanel, _Component);

  var _super = _createSuper(WindowSideBarCollectionPanel);

  function WindowSideBarCollectionPanel() {
    _classCallCheck(this, WindowSideBarCollectionPanel);

    return _super.apply(this, arguments);
  }

  _createClass(WindowSideBarCollectionPanel, [{
    key: "isMultipart",
    value:
    /** */
    function isMultipart() {
      var collection = this.props.collection;
      if (!collection) return false;
      var behaviors = collection.getProperty('behavior');
      if (Array.isArray(behaviors)) return collection.includes('multi-part');
      return behaviors === 'multi-part';
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          canvasNavigation = _this$props.canvasNavigation,
          classes = _this$props.classes,
          collectionPath = _this$props.collectionPath,
          collection = _this$props.collection,
          id = _this$props.id,
          isFetching = _this$props.isFetching,
          manifestId = _this$props.manifestId,
          parentCollection = _this$props.parentCollection,
          updateCompanionWindow = _this$props.updateCompanionWindow,
          updateWindow = _this$props.updateWindow,
          t = _this$props.t,
          variant = _this$props.variant,
          windowId = _this$props.windowId;
      /** */

      var Item = function Item(_ref) {
        var manifest = _ref.manifest,
            otherProps = _objectWithoutProperties(_ref, ["manifest"]);

        return /*#__PURE__*/React.createElement(MenuItem, Object.assign({
          className: classes.menuItem,
          alignItems: "flex-start",
          button: true,
          component: "li",
          selected: manifestId === manifest.id
        }, otherProps), variant === 'thumbnail' && /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(IIIFThumbnail, {
          resource: manifest,
          maxHeight: canvasNavigation.height,
          maxWidth: canvasNavigation.width
        })), /*#__PURE__*/React.createElement(ListItemText, null, WindowSideBarCollectionPanel.getUseableLabel(manifest)));
      };

      return /*#__PURE__*/React.createElement(CompanionWindow, {
        title: t(this.isMultipart() ? 'multipartCollection' : 'collection'),
        windowId: windowId,
        id: id,
        titleControls: /*#__PURE__*/React.createElement(React.Fragment, null, parentCollection && /*#__PURE__*/React.createElement(List, null, /*#__PURE__*/React.createElement(ListItem, {
          button: true,
          onClick: function onClick() {
            return updateCompanionWindow({
              collectionPath: collectionPath.slice(0, -1)
            });
          }
        }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(ArrowUpwardIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
          primaryTypographyProps: {
            variant: 'body1'
          }
        }, WindowSideBarCollectionPanel.getUseableLabel(parentCollection)))), /*#__PURE__*/React.createElement(Typography, {
          variant: "h6"
        }, collection && WindowSideBarCollectionPanel.getUseableLabel(collection), isFetching && /*#__PURE__*/React.createElement(Skeleton, {
          className: classes.placeholder,
          variant: "text"
        })))
      }, /*#__PURE__*/React.createElement(MenuList, null, isFetching && /*#__PURE__*/React.createElement(MenuItem, null, /*#__PURE__*/React.createElement(ListItemText, null, /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      }), /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      }), /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      }))), collection && collection.getCollections().map(function (manifest) {
        /** select the new manifest and go back to the normal index */
        var onClick = function onClick() {
          // close collection
          updateCompanionWindow({
            collectionPath: [].concat(_toConsumableArray(collectionPath), [manifest.id])
          });
        };

        return /*#__PURE__*/React.createElement(Item, {
          key: manifest.id,
          onClick: onClick,
          manifest: manifest
        });
      }), collection && collection.getManifests().map(function (manifest) {
        /** select the new manifest and go back to the normal index */
        var onClick = function onClick() {
          // select new manifest
          updateWindow({
            canvasId: null,
            collectionPath: collectionPath,
            manifestId: manifest.id
          }); // close collection

          updateCompanionWindow({
            multipart: false
          });
        };

        return /*#__PURE__*/React.createElement(Item, {
          key: manifest.id,
          onClick: onClick,
          manifest: manifest
        });
      })));
    }
  }], [{
    key: "getUseableLabel",
    value:
    /** */
    function getUseableLabel(resource, index) {
      return resource && resource.getLabel && resource.getLabel().length > 0 ? resource.getLabel().getValue() : resource.id;
    }
  }]);

  return WindowSideBarCollectionPanel;
}(Component);
WindowSideBarCollectionPanel.defaultProps = {
  collection: null,
  collectionPath: [],
  error: null,
  isFetching: false,
  parentCollection: null,
  ready: false,
  t: function t(k) {
    return k;
  },
  variant: null
};