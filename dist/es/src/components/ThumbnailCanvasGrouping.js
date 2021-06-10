function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import IIIFThumbnail from '../containers/IIIFThumbnail';
import ns from '../config/css-ns';
/** */

export var ThumbnailCanvasGrouping = /*#__PURE__*/function (_PureComponent) {
  _inherits(ThumbnailCanvasGrouping, _PureComponent);

  var _super = _createSuper(ThumbnailCanvasGrouping);

  /** */
  function ThumbnailCanvasGrouping(props) {
    var _this;

    _classCallCheck(this, ThumbnailCanvasGrouping);

    _this = _super.call(this, props);
    _this.setCanvas = _this.setCanvas.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** */


  _createClass(ThumbnailCanvasGrouping, [{
    key: "setCanvas",
    value: function setCanvas(e) {
      var setCanvas = this.props.setCanvas;
      setCanvas(e.currentTarget.dataset.canvasId);
    }
    /**
     * Determines whether the current index is the rendered canvas, providing
     * a useful class.
     */

  }, {
    key: "currentCanvasClass",
    value: function currentCanvasClass(canvasIndices) {
      var index = this.props.index;
      if (canvasIndices.includes(index)) return 'current-canvas-grouping';
      return '';
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          index = _this$props.index,
          style = _this$props.style,
          data = _this$props.data,
          classes = _this$props.classes,
          currentCanvasId = _this$props.currentCanvasId,
          tileFormat = _this$props.tileFormat;
      var canvasGroupings = data.canvasGroupings,
          position = data.position,
          height = data.height;
      var currentGroupings = canvasGroupings[index];
      var SPACING = 8;
      return /*#__PURE__*/React.createElement("div", {
        style: _objectSpread(_objectSpread({}, style), {}, {
          boxSizing: 'content-box',
          height: Number.isInteger(style.height) ? style.height - SPACING : null,
          left: style.left + SPACING,
          top: style.top + SPACING,
          width: Number.isInteger(style.width) ? style.width - SPACING : null
        }),
        className: ns('thumbnail-nav-container'),
        role: "gridcell",
        "aria-colindex": index + 1
      }, /*#__PURE__*/React.createElement("div", {
        role: "button",
        "data-canvas-id": currentGroupings[0].id,
        "data-canvas-index": currentGroupings[0].index,
        onKeyUp: this.setCanvas,
        onClick: this.setCanvas,
        tabIndex: -1,
        style: {
          height: position === 'far-right' ? 'auto' : "".concat(height - SPACING, "px"),
          width: position === 'far-bottom' ? 'auto' : "".concat(style.width, "px")
        },
        className: classNames(ns(['thumbnail-nav-canvas', "thumbnail-nav-canvas-".concat(index), this.currentCanvasClass(currentGroupings.map(function (canvas) {
          return canvas.index;
        }))]), classes.canvas, _defineProperty({}, classes.currentCanvas, currentGroupings.map(function (canvas) {
          return canvas.id;
        }).includes(currentCanvasId)))
      }, currentGroupings.map(function (canvas, i) {
        return /*#__PURE__*/React.createElement(IIIFThumbnail, {
          key: canvas.id,
          resource: canvas,
          labelled: true,
          maxHeight: position === 'far-right' ? style.height - 1.5 * SPACING : height - 1.5 * SPACING,
          variant: "inside",
          tileFormat: tileFormat
        });
      })));
    }
  }]);

  return ThumbnailCanvasGrouping;
}(PureComponent);
ThumbnailCanvasGrouping.defaultProps = {
  tileFormat: null
};