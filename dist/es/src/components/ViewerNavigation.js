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
import NavigationIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import classNames from 'classnames';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';
/**
 */

export var ViewerNavigation = /*#__PURE__*/function (_Component) {
  _inherits(ViewerNavigation, _Component);

  var _super = _createSuper(ViewerNavigation);

  function ViewerNavigation() {
    _classCallCheck(this, ViewerNavigation);

    return _super.apply(this, arguments);
  }

  _createClass(ViewerNavigation, [{
    key: "render",
    value:
    /**
     * Renders things
     */
    function render() {
      var _this$props = this.props,
          hasNextCanvas = _this$props.hasNextCanvas,
          hasPreviousCanvas = _this$props.hasPreviousCanvas,
          setNextCanvas = _this$props.setNextCanvas,
          setPreviousCanvas = _this$props.setPreviousCanvas,
          t = _this$props.t,
          classes = _this$props.classes,
          viewingDirection = _this$props.viewingDirection;
      var htmlDir = 'ltr';
      var previousIconStyle = {};
      var nextIconStyle = {};

      switch (viewingDirection) {
        case 'top-to-bottom':
          previousIconStyle = {
            transform: 'rotate(270deg)'
          };
          nextIconStyle = {
            transform: 'rotate(90deg)'
          };
          break;

        case 'bottom-to-top':
          previousIconStyle = {
            transform: 'rotate(90deg)'
          };
          nextIconStyle = {
            transform: 'rotate(270deg)'
          };
          break;

        case 'right-to-left':
          htmlDir = 'rtl';
          previousIconStyle = {};
          nextIconStyle = {
            transform: 'rotate(180deg)'
          };
          break;

        default:
          previousIconStyle = {
            transform: 'rotate(180deg)'
          };
          nextIconStyle = {};
      }

      return /*#__PURE__*/React.createElement("div", {
        className: classNames(ns('osd-navigation'), classes.osdNavigation),
        dir: htmlDir
      }, /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('previousCanvas'),
        className: ns('previous-canvas-button'),
        disabled: !hasPreviousCanvas,
        onClick: function onClick() {
          hasPreviousCanvas && setPreviousCanvas();
        }
      }, /*#__PURE__*/React.createElement(NavigationIcon, {
        style: previousIconStyle
      })), /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('nextCanvas'),
        className: ns('next-canvas-button'),
        disabled: !hasNextCanvas,
        onClick: function onClick() {
          hasNextCanvas && setNextCanvas();
        }
      }, /*#__PURE__*/React.createElement(NavigationIcon, {
        style: nextIconStyle
      })));
    }
  }]);

  return ViewerNavigation;
}(Component);
ViewerNavigation.defaultProps = {
  hasNextCanvas: false,
  hasPreviousCanvas: false,
  setNextCanvas: function setNextCanvas() {},
  setPreviousCanvas: function setPreviousCanvas() {},
  viewingDirection: ''
};