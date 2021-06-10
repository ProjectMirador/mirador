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
import Paper from '@material-ui/core/Paper';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import classNames from 'classnames';
import CanvasWorld from '../lib/CanvasWorld';
import ThumbnailCanvasGrouping from '../containers/ThumbnailCanvasGrouping';
import ns from '../config/css-ns';
/**
 */

export var ThumbnailNavigation = /*#__PURE__*/function (_Component) {
  _inherits(ThumbnailNavigation, _Component);

  var _super = _createSuper(ThumbnailNavigation);

  /**
   */
  function ThumbnailNavigation(props) {
    var _this;

    _classCallCheck(this, ThumbnailNavigation);

    _this = _super.call(this, props);
    _this.scrollbarSize = 15;
    _this.spacing = 8; // 2 * (2px margin + 2px border + 2px padding + 2px padding)

    _this.calculateScaledSize = _this.calculateScaledSize.bind(_assertThisInitialized(_this));
    _this.itemCount = _this.itemCount.bind(_assertThisInitialized(_this));
    _this.handleKeyUp = _this.handleKeyUp.bind(_assertThisInitialized(_this));
    _this.nextCanvas = _this.nextCanvas.bind(_assertThisInitialized(_this));
    _this.previousCanvas = _this.previousCanvas.bind(_assertThisInitialized(_this));
    _this.gridRef = /*#__PURE__*/React.createRef();
    return _this;
  }
  /**
   * If the view has changed and the thumbnailNavigation is open, recompute all
   * of the grids
   */


  _createClass(ThumbnailNavigation, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          canvasIndex = _this$props.canvasIndex,
          position = _this$props.position,
          view = _this$props.view;

      if (prevProps.view !== view && position !== 'off') {
        this.gridRef.current.resetAfterIndex(0);
      }

      if (prevProps.canvasIndex !== canvasIndex) {
        var index = canvasIndex;
        if (view === 'book') index = Math.ceil(index / 2);
        this.gridRef.current.scrollToItem(index, 'center');
      }
    }
    /** */

  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      var position = this.props.position;
      var nextKey = 'ArrowRight';
      var previousKey = 'ArrowLeft';

      if (position === 'far-right') {
        nextKey = 'ArrowDown';
        previousKey = 'ArrowUp';
      }

      switch (e.key) {
        case nextKey:
          this.nextCanvas();
          break;

        case previousKey:
          this.previousCanvas();
          break;

        default:
          break;
      }
    }
    /**
     * When on right, row height
     * When on bottom, column width
     */

  }, {
    key: "calculateScaledSize",
    value: function calculateScaledSize(index) {
      var _this$props2 = this.props,
          thumbnailNavigation = _this$props2.thumbnailNavigation,
          canvasGroupings = _this$props2.canvasGroupings,
          position = _this$props2.position;
      var canvases = canvasGroupings[index];
      var world = new CanvasWorld(canvases);
      var bounds = world.worldBounds();

      switch (position) {
        case 'far-right':
          {
            var calc = Math.floor(this.calculatingWidth(canvases.length) * bounds[3] / bounds[2]);
            if (!Number.isInteger(calc)) return thumbnailNavigation.width + this.spacing;
            return calc + this.spacing;
          }
        // Default case bottom

        default:
          {
            if (bounds[3] === 0) return thumbnailNavigation.width + this.spacing;

            var _calc = Math.ceil((thumbnailNavigation.height - this.scrollbarSize - this.spacing - 4) * bounds[2] / bounds[3]);

            return _calc;
          }
      }
    }
    /** */

  }, {
    key: "calculatingWidth",
    value: function calculatingWidth(canvasesLength) {
      var thumbnailNavigation = this.props.thumbnailNavigation;

      if (canvasesLength === 1) {
        return thumbnailNavigation.width;
      }

      return thumbnailNavigation.width * 2;
    }
    /** */

  }, {
    key: "rightWidth",
    value: function rightWidth() {
      var _this$props3 = this.props,
          view = _this$props3.view,
          thumbnailNavigation = _this$props3.thumbnailNavigation;

      switch (view) {
        case 'book':
          return thumbnailNavigation.width * 2;

        default:
          return thumbnailNavigation.width;
      }
    }
    /** */

  }, {
    key: "style",
    value: function style() {
      var _this$props4 = this.props,
          position = _this$props4.position,
          thumbnailNavigation = _this$props4.thumbnailNavigation;

      switch (position) {
        case 'far-right':
          return {
            height: '100%',
            minHeight: 0,
            width: "".concat(this.rightWidth() + this.scrollbarSize + this.spacing, "px")
          };
        // Default case bottom

        default:
          return {
            height: "".concat(thumbnailNavigation.height, "px"),
            width: '100%'
          };
      }
    }
    /** */

  }, {
    key: "areaHeight",
    value: function areaHeight(height) {
      var _this$props5 = this.props,
          position = _this$props5.position,
          thumbnailNavigation = _this$props5.thumbnailNavigation;

      switch (position) {
        case 'far-right':
          return height;
        // Default case bottom

        default:
          return thumbnailNavigation.height;
      }
    }
    /** */

  }, {
    key: "itemCount",
    value: function itemCount() {
      var canvasGroupings = this.props.canvasGroupings;
      return canvasGroupings.length;
    }
    /**
     */

  }, {
    key: "nextCanvas",
    value: function nextCanvas() {
      var _this$props6 = this.props,
          hasNextCanvas = _this$props6.hasNextCanvas,
          setNextCanvas = _this$props6.setNextCanvas;

      if (hasNextCanvas) {
        setNextCanvas();
      }
    }
    /**
     */

  }, {
    key: "previousCanvas",
    value: function previousCanvas() {
      var _this$props7 = this.props,
          hasPreviousCanvas = _this$props7.hasPreviousCanvas,
          setPreviousCanvas = _this$props7.setPreviousCanvas;

      if (hasPreviousCanvas) {
        setPreviousCanvas();
      }
    }
    /**
     * Renders things
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props8 = this.props,
          t = _this$props8.t,
          canvasGroupings = _this$props8.canvasGroupings,
          classes = _this$props8.classes,
          position = _this$props8.position,
          thumbnailNavigation = _this$props8.thumbnailNavigation,
          viewingDirection = _this$props8.viewingDirection,
          windowId = _this$props8.windowId;

      if (position === 'off') {
        return /*#__PURE__*/React.createElement(React.Fragment, null);
      }

      var htmlDir = viewingDirection === 'right-to-left' ? 'rtl' : 'ltr';
      var itemData = {
        canvasGroupings: canvasGroupings,
        height: thumbnailNavigation.height - this.spacing - this.scrollbarSize,
        position: position,
        windowId: windowId
      };
      return /*#__PURE__*/React.createElement(Paper, {
        className: classNames(ns('thumb-navigation'), classes.thumbNavigation),
        "aria-label": t('thumbnailNavigation'),
        square: true,
        elevation: 0,
        style: this.style(),
        tabIndex: 0,
        onKeyUp: this.handleKeyUp,
        role: "grid"
      }, /*#__PURE__*/React.createElement("div", {
        role: "row",
        style: {
          height: '100%',
          width: '100%'
        }
      }, /*#__PURE__*/React.createElement(AutoSizer, {
        defaultHeight: 100,
        defaultWidth: 400
      }, function (_ref) {
        var height = _ref.height,
            width = _ref.width;
        return /*#__PURE__*/React.createElement(List, {
          direction: htmlDir,
          height: _this2.areaHeight(height),
          itemCount: _this2.itemCount(),
          itemSize: _this2.calculateScaledSize,
          width: width,
          layout: position === 'far-bottom' ? 'horizontal' : 'vertical',
          itemData: itemData,
          ref: _this2.gridRef
        }, ThumbnailCanvasGrouping);
      })));
    }
  }]);

  return ThumbnailNavigation;
}(Component);
ThumbnailNavigation.defaultProps = {
  hasNextCanvas: false,
  hasPreviousCanvas: false,
  setNextCanvas: function setNextCanvas() {},
  setPreviousCanvas: function setPreviousCanvas() {},
  view: undefined,
  viewingDirection: ''
};