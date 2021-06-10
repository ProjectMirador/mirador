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
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import { MosaicWindowContext } from 'react-mosaic-component/lib/contextTypes';
import ns from '../config/css-ns';
import WindowTopBar from '../containers/WindowTopBar';
import PrimaryWindow from '../containers/PrimaryWindow';
import CompanionArea from '../containers/CompanionArea';
import MinimalWindow from '../containers/MinimalWindow';
import ErrorContent from '../containers/ErrorContent';
import IIIFAuthentication from '../containers/IIIFAuthentication';
import { PluginHook } from './PluginHook';
/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */

export var Window = /*#__PURE__*/function (_Component) {
  _inherits(Window, _Component);

  var _super = _createSuper(Window);

  /** */
  function Window(props) {
    var _this;

    _classCallCheck(this, Window);

    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }
  /** */


  _createClass(Window, [{
    key: "wrappedTopBar",
    value:
    /**
     * wrappedTopBar - will conditionally wrap a WindowTopBar for needed
     * additional functionality based on workspace type
     */
    function wrappedTopBar() {
      var _this$props = this.props,
          windowId = _this$props.windowId,
          workspaceType = _this$props.workspaceType,
          windowDraggable = _this$props.windowDraggable;
      var topBar = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WindowTopBar, {
        windowId: windowId,
        windowDraggable: windowDraggable
      }), /*#__PURE__*/React.createElement(IIIFAuthentication, {
        windowId: windowId
      }));

      if (workspaceType === 'mosaic' && windowDraggable) {
        var mosaicWindowActions = this.context.mosaicWindowActions;
        return mosaicWindowActions.connectDragSource(topBar);
      }

      return topBar;
    }
    /**
     * Renders things
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          focusWindow = _this$props2.focusWindow,
          label = _this$props2.label,
          isFetching = _this$props2.isFetching,
          maximized = _this$props2.maximized,
          sideBarOpen = _this$props2.sideBarOpen,
          view = _this$props2.view,
          windowId = _this$props2.windowId,
          classes = _this$props2.classes,
          t = _this$props2.t,
          manifestError = _this$props2.manifestError;
      var _this$state = this.state,
          error = _this$state.error,
          hasError = _this$state.hasError;

      if (hasError) {
        return /*#__PURE__*/React.createElement(MinimalWindow, {
          windowId: windowId
        }, /*#__PURE__*/React.createElement(ErrorContent, {
          error: error,
          windowId: windowId
        }));
      }

      return /*#__PURE__*/React.createElement(Paper, {
        onFocus: focusWindow,
        component: "section",
        elevation: 1,
        id: windowId,
        className: cn(classes.window, ns('window'), maximized ? classes.maximized : null),
        "aria-label": t('window', {
          label: label
        })
      }, this.wrappedTopBar(), manifestError && /*#__PURE__*/React.createElement(ErrorContent, {
        error: {
          stack: manifestError
        },
        windowId: windowId
      }), /*#__PURE__*/React.createElement("div", {
        className: classes.middle
      }, /*#__PURE__*/React.createElement("div", {
        className: classes.middleLeft
      }, /*#__PURE__*/React.createElement("div", {
        className: classes.primaryWindow
      }, /*#__PURE__*/React.createElement(PrimaryWindow, {
        view: view,
        windowId: windowId,
        isFetching: isFetching,
        sideBarOpen: sideBarOpen
      })), /*#__PURE__*/React.createElement("div", {
        className: classes.companionAreaBottom
      }, /*#__PURE__*/React.createElement(CompanionArea, {
        windowId: windowId,
        position: "bottom"
      }))), /*#__PURE__*/React.createElement("div", {
        className: classes.companionAreaRight
      }, /*#__PURE__*/React.createElement(CompanionArea, {
        windowId: windowId,
        position: "right"
      }), /*#__PURE__*/React.createElement(CompanionArea, {
        windowId: windowId,
        position: "far-right"
      }))), /*#__PURE__*/React.createElement(CompanionArea, {
        windowId: windowId,
        position: "far-bottom"
      }), /*#__PURE__*/React.createElement(PluginHook, this.props));
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return {
        error: error,
        hasError: true
      };
    }
  }]);

  return Window;
}(Component);
Window.contextType = MosaicWindowContext;
Window.defaultProps = {
  classes: {},
  focusWindow: function focusWindow() {},
  isFetching: false,
  label: null,
  manifestError: null,
  maximized: false,
  sideBarOpen: false,
  view: undefined,
  windowDraggable: null,
  workspaceType: null
};