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
import CompanionWindow from '../containers/CompanionWindow';
import CanvasInfo from '../containers/CanvasInfo';
import LocalePicker from '../containers/LocalePicker';
import ManifestInfo from '../containers/ManifestInfo';
import CollectionInfo from '../containers/CollectionInfo';
import ManifestRelatedLinks from '../containers/ManifestRelatedLinks';
import ns from '../config/css-ns';
/**
 * WindowSideBarInfoPanel
 */

export var WindowSideBarInfoPanel = /*#__PURE__*/function (_Component) {
  _inherits(WindowSideBarInfoPanel, _Component);

  var _super = _createSuper(WindowSideBarInfoPanel);

  function WindowSideBarInfoPanel() {
    _classCallCheck(this, WindowSideBarInfoPanel);

    return _super.apply(this, arguments);
  }

  _createClass(WindowSideBarInfoPanel, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
          windowId = _this$props.windowId,
          id = _this$props.id,
          canvasIds = _this$props.canvasIds,
          classes = _this$props.classes,
          collectionPath = _this$props.collectionPath,
          t = _this$props.t,
          locale = _this$props.locale,
          setLocale = _this$props.setLocale,
          availableLocales = _this$props.availableLocales,
          showLocalePicker = _this$props.showLocalePicker;
      return /*#__PURE__*/React.createElement(CompanionWindow, {
        title: t('aboutThisItem'),
        paperClassName: ns('window-sidebar-info-panel'),
        windowId: windowId,
        id: id,
        titleControls: showLocalePicker && /*#__PURE__*/React.createElement(LocalePicker, {
          locale: locale,
          setLocale: setLocale,
          availableLocales: availableLocales
        })
      }, canvasIds.map(function (canvasId, index) {
        return /*#__PURE__*/React.createElement("div", {
          key: canvasId,
          className: classes.section
        }, /*#__PURE__*/React.createElement(CanvasInfo, {
          id: id,
          canvasId: canvasId,
          index: index,
          totalSize: canvasIds.length,
          windowId: windowId
        }));
      }), collectionPath.length > 0 && /*#__PURE__*/React.createElement("div", {
        className: classes.section
      }, /*#__PURE__*/React.createElement(CollectionInfo, {
        id: id,
        windowId: windowId
      })), /*#__PURE__*/React.createElement("div", {
        className: classes.section
      }, /*#__PURE__*/React.createElement(ManifestInfo, {
        id: id,
        windowId: windowId
      })), /*#__PURE__*/React.createElement("div", {
        className: classes.section
      }, /*#__PURE__*/React.createElement(ManifestRelatedLinks, {
        id: id,
        windowId: windowId
      })));
    }
  }]);

  return WindowSideBarInfoPanel;
}(Component);
WindowSideBarInfoPanel.defaultProps = {
  availableLocales: [],
  canvasIds: [],
  classes: {},
  collectionPath: [],
  locale: '',
  setLocale: undefined,
  showLocalePicker: false,
  t: function t(key) {
    return key;
  }
};