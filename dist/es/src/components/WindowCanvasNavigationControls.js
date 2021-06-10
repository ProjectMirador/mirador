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
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ZoomControls from '../containers/ZoomControls';
import ViewerInfo from '../containers/ViewerInfo';
import ViewerNavigation from '../containers/ViewerNavigation';
import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';
/**
 * Represents the viewer controls in the mirador workspace.
 */

export var WindowCanvasNavigationControls = /*#__PURE__*/function (_Component) {
  _inherits(WindowCanvasNavigationControls, _Component);

  var _super = _createSuper(WindowCanvasNavigationControls);

  function WindowCanvasNavigationControls() {
    _classCallCheck(this, WindowCanvasNavigationControls);

    return _super.apply(this, arguments);
  }

  _createClass(WindowCanvasNavigationControls, [{
    key: "canvasNavControlsAreStacked",
    value:
    /**
     * Determine if canvasNavControls are stacked (based on a hard-coded width)
    */
    function canvasNavControlsAreStacked() {
      var size = this.props.size;
      return size && size.width && size.width <= 253;
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          visible = _this$props.visible,
          windowId = _this$props.windowId,
          zoomToWorld = _this$props.zoomToWorld;
      if (!visible) return /*#__PURE__*/React.createElement(Typography, {
        variant: "srOnly",
        component: "div"
      }, /*#__PURE__*/React.createElement(ViewerInfo, {
        windowId: windowId
      }));
      return /*#__PURE__*/React.createElement(Paper, {
        square: true,
        className: classNames(classes.controls, ns('canvas-nav'), classes.canvasNav, this.canvasNavControlsAreStacked() ? ns('canvas-nav-stacked') : null, this.canvasNavControlsAreStacked() ? classes.canvasNavStacked : null),
        elevation: 0
      }, /*#__PURE__*/React.createElement(ZoomControls, {
        displayDivider: !this.canvasNavControlsAreStacked(),
        windowId: windowId,
        zoomToWorld: zoomToWorld
      }), /*#__PURE__*/React.createElement(ViewerNavigation, {
        windowId: windowId
      }), /*#__PURE__*/React.createElement(ViewerInfo, {
        windowId: windowId
      }), /*#__PURE__*/React.createElement(PluginHook, this.props));
    }
  }]);

  return WindowCanvasNavigationControls;
}(Component);
WindowCanvasNavigationControls.defaultProps = {
  classes: {},
  visible: true
};