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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { Component } from 'react';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import DragHandleIcon from '@material-ui/icons/DragHandleSharp';
import MoveToTopIcon from '@material-ui/icons/VerticalAlignTopSharp';
import VisibilityIcon from '@material-ui/icons/VisibilitySharp';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffSharp';
import OpacityIcon from '@material-ui/icons/OpacitySharp';
import Typography from '@material-ui/core/Typography';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import IIIFThumbnail from '../containers/IIIFThumbnail';
/** */

var reorder = function reorder(list, startIndex, endIndex) {
  var result = Array.from(list);

  var _result$splice = result.splice(startIndex, 1),
      _result$splice2 = _slicedToArray(_result$splice, 1),
      removed = _result$splice2[0];

  result.splice(endIndex, 0, removed);
  return result;
};
/** */


export var CanvasLayers = /*#__PURE__*/function (_Component) {
  _inherits(CanvasLayers, _Component);

  var _super = _createSuper(CanvasLayers);

  /** */
  function CanvasLayers(props) {
    var _this;

    _classCallCheck(this, CanvasLayers);

    _this = _super.call(this, props);
    _this.droppableId = uuid();
    _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_this));
    _this.handleOpacityChange = _this.handleOpacityChange.bind(_assertThisInitialized(_this));
    _this.setLayerVisibility = _this.setLayerVisibility.bind(_assertThisInitialized(_this));
    _this.moveToTop = _this.moveToTop.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** */


  _createClass(CanvasLayers, [{
    key: "handleOpacityChange",
    value: function handleOpacityChange(layerId, value) {
      var _this$props = this.props,
          canvasId = _this$props.canvasId,
          updateLayers = _this$props.updateLayers,
          windowId = _this$props.windowId;

      var payload = _defineProperty({}, layerId, {
        opacity: value / 100.0
      });

      updateLayers(windowId, canvasId, payload);
    }
    /** */

  }, {
    key: "onDragEnd",
    value: function onDragEnd(result) {
      var _this$props2 = this.props,
          canvasId = _this$props2.canvasId,
          layers = _this$props2.layers,
          updateLayers = _this$props2.updateLayers,
          windowId = _this$props2.windowId;
      if (!result.destination) return;
      if (result.destination.droppableId !== this.droppableId) return;
      if (result.source.droppableId !== this.droppableId) return;
      var sortedLayers = reorder(layers.map(function (l) {
        return l.id;
      }), result.source.index, result.destination.index);
      var payload = layers.reduce(function (acc, layer) {
        acc[layer.id] = {
          index: sortedLayers.indexOf(layer.id)
        };
        return acc;
      }, {});
      updateLayers(windowId, canvasId, payload);
    }
    /** */

  }, {
    key: "setLayerVisibility",
    value: function setLayerVisibility(layerId, value) {
      var _this$props3 = this.props,
          canvasId = _this$props3.canvasId,
          updateLayers = _this$props3.updateLayers,
          windowId = _this$props3.windowId;

      var payload = _defineProperty({}, layerId, {
        visibility: value
      });

      updateLayers(windowId, canvasId, payload);
    }
    /** */

  }, {
    key: "moveToTop",
    value: function moveToTop(layerId) {
      var _this$props4 = this.props,
          canvasId = _this$props4.canvasId,
          layers = _this$props4.layers,
          updateLayers = _this$props4.updateLayers,
          windowId = _this$props4.windowId;
      var sortedLayers = reorder(layers.map(function (l) {
        return l.id;
      }), layers.findIndex(function (l) {
        return l.id === layerId;
      }), 0);
      var payload = layers.reduce(function (acc, layer) {
        acc[layer.id] = {
          index: sortedLayers.indexOf(layer.id)
        };
        return acc;
      }, {});
      updateLayers(windowId, canvasId, payload);
    }
    /** @private */

  }, {
    key: "renderLayer",
    value: function renderLayer(resource, index) {
      var _this2 = this;

      var _this$props5 = this.props,
          classes = _this$props5.classes,
          layerMetadata = _this$props5.layerMetadata,
          t = _this$props5.t;
      var _height$width = {
        height: undefined,
        width: 50
      },
          width = _height$width.width,
          height = _height$width.height;

      var layer = _objectSpread({
        opacity: 1,
        visibility: true
      }, (layerMetadata || {})[resource.id]);

      return /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          alignItems: 'flex-start',
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement(IIIFThumbnail, {
        maxHeight: height,
        maxWidth: width,
        resource: resource,
        classes: {
          image: classes.image,
          root: classes.thumbnail
        }
      }), /*#__PURE__*/React.createElement(Typography, {
        className: classes.label,
        component: "div",
        variant: "body1"
      }, CanvasLayers.getUseableLabel(resource, index), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t(layer.visibility ? 'layer_hide' : 'layer_show'),
        edge: "start",
        size: "small",
        onClick: function onClick() {
          _this2.setLayerVisibility(resource.id, !layer.visibility);
        }
      }, layer.visibility ? /*#__PURE__*/React.createElement(VisibilityIcon, null) : /*#__PURE__*/React.createElement(VisibilityOffIcon, null)), layer.index !== 0 && /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('layer_moveToTop'),
        size: "small",
        onClick: function onClick() {
          _this2.moveToTop(resource.id);
        }
      }, /*#__PURE__*/React.createElement(MoveToTopIcon, null))))), /*#__PURE__*/React.createElement("div", {
        style: {
          alignItems: 'center',
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement(Tooltip, {
        title: t('layer_opacity')
      }, /*#__PURE__*/React.createElement(OpacityIcon, {
        className: classes.opacityIcon,
        color: layer.visibility ? 'inherit' : 'disabled',
        fontSize: "small"
      })), /*#__PURE__*/React.createElement(Input, {
        classes: {
          input: classes.opacityInput
        },
        disabled: !layer.visibility,
        value: Math.round(layer.opacity * 100),
        type: "number",
        min: 0,
        max: 100,
        onChange: function onChange(e) {
          return _this2.handleOpacityChange(resource.id, e.target.value);
        },
        endAdornment: /*#__PURE__*/React.createElement(InputAdornment, {
          disableTypography: true,
          position: "end"
        }, /*#__PURE__*/React.createElement(Typography, {
          variant: "caption"
        }, "%")),
        inputProps: {
          'aria-label': t('layer_opacity')
        }
      }), /*#__PURE__*/React.createElement(Slider, {
        className: classes.slider,
        disabled: !layer.visibility,
        value: layer.opacity * 100,
        onChange: function onChange(e, value) {
          return _this2.handleOpacityChange(resource.id, value);
        }
      })));
    }
    /** @private */

  }, {
    key: "renderDraggableLayer",
    value: function renderDraggableLayer(resource, index) {
      var _this3 = this;

      var _this$props6 = this.props,
          classes = _this$props6.classes,
          t = _this$props6.t;
      return /*#__PURE__*/React.createElement(Draggable, {
        key: resource.id,
        draggableId: resource.id,
        index: index
      }, function (provided, snapshot) {
        return /*#__PURE__*/React.createElement(ListItem, Object.assign({
          ref: provided.innerRef
        }, provided.draggableProps, {
          component: "li",
          className: clsx(classes.listItem, _defineProperty({}, classes.dragging, snapshot.isDragging)),
          disableGutters: true,
          key: resource.id
        }), /*#__PURE__*/React.createElement("div", Object.assign({}, provided.dragHandleProps, {
          className: classes.dragHandle
        }), /*#__PURE__*/React.createElement(Tooltip, {
          title: t('layer_move')
        }, /*#__PURE__*/React.createElement(DragHandleIcon, null))), _this3.renderLayer(resource, index));
      });
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props7 = this.props,
          classes = _this$props7.classes,
          index = _this$props7.index,
          label = _this$props7.label,
          layers = _this$props7.layers,
          t = _this$props7.t,
          totalSize = _this$props7.totalSize;
      return /*#__PURE__*/React.createElement(React.Fragment, null, totalSize > 1 && /*#__PURE__*/React.createElement(Typography, {
        className: classes.sectionHeading,
        variant: "overline"
      }, t('annotationCanvasLabel', {
        context: "".concat(index + 1, "/").concat(totalSize),
        label: label
      })), /*#__PURE__*/React.createElement(DragDropContext, {
        onDragEnd: this.onDragEnd
      }, /*#__PURE__*/React.createElement(Droppable, {
        droppableId: this.droppableId
      }, function (provided, snapshot) {
        return /*#__PURE__*/React.createElement(List, Object.assign({
          className: classes.list
        }, provided.droppableProps, {
          ref: provided.innerRef
        }), layers && layers.map(function (r, i) {
          return _this4.renderDraggableLayer(r, i);
        }), provided.placeholder);
      })));
    }
  }], [{
    key: "getUseableLabel",
    value:
    /** */
    function getUseableLabel(resource, index) {
      return resource && resource.getLabel && resource.getLabel().length > 0 ? resource.getLabel().getValue() : String(index + 1);
    }
  }]);

  return CanvasLayers;
}(Component);
CanvasLayers.defaultProps = {
  classes: {},
  layerMetadata: undefined
};