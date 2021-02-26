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

import React, { Component } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import clsx from 'clsx';
import { ScrollTo } from './ScrollTo';
/** */

function getStartCanvasId(node) {
  var jsonld = node.data.__jsonld; // eslint-disable-line no-underscore-dangle

  if (jsonld.startCanvas && typeof jsonld.startCanvas === 'string') {
    return jsonld.startCanvas;
  }

  if (jsonld.start) {
    if (jsonld.start.type === 'Canvas' && typeof jsonld.start.id === 'string') {
      return jsonld.start.id;
    }

    if (jsonld.start.type === 'SpecificResource' && typeof jsonld.start.source === 'string') {
      return jsonld.start.source;
    }
  }

  return node.data.getCanvasIds()[0];
}
/** */


export var SidebarIndexTableOfContents = /*#__PURE__*/function (_Component) {
  _inherits(SidebarIndexTableOfContents, _Component);

  var _super = _createSuper(SidebarIndexTableOfContents);

  function SidebarIndexTableOfContents() {
    _classCallCheck(this, SidebarIndexTableOfContents);

    return _super.apply(this, arguments);
  }

  _createClass(SidebarIndexTableOfContents, [{
    key: "handleKeyPressed",
    value:
    /** */
    function handleKeyPressed(event, node) {
      var _this$props = this.props,
          expandedNodeIds = _this$props.expandedNodeIds,
          toggleNode = _this$props.toggleNode;

      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        this.selectTreeItem(node);
      }

      if (event.key === 'ArrowLeft' && expandedNodeIds.indexOf(node.id) !== -1 || event.key === 'ArrowRight' && expandedNodeIds.indexOf(node.id) === -1 && node.nodes.length > 0) {
        toggleNode(node.id);
      }
    }
    /** */

  }, {
    key: "selectTreeItem",
    value: function selectTreeItem(node) {
      var _this$props2 = this.props,
          setCanvas = _this$props2.setCanvas,
          toggleNode = _this$props2.toggleNode,
          windowId = _this$props2.windowId;

      if (node.nodes.length > 0) {
        toggleNode(node.id);
      } // Do not select if there are no canvases listed or it has children


      if (!node.data.getCanvasIds() || node.data.getCanvasIds().length === 0 || node.nodes.length > 0) {
        return;
      }

      var target = getStartCanvasId(node);
      var canvasId = target.indexOf('#') === -1 ? target : target.substr(0, target.indexOf('#'));
      setCanvas(windowId, canvasId);
    }
    /** */

  }, {
    key: "buildTreeItems",
    value: function buildTreeItems(nodes, visibleNodeIds, containerRef, nodeIdToScrollTo) {
      var _this = this;

      var classes = this.props.classes;

      if (!nodes) {
        return null;
      }

      return nodes.map(function (node) {
        return /*#__PURE__*/React.createElement(ScrollTo, {
          containerRef: containerRef,
          key: "".concat(node.id, "-scroll"),
          offsetTop: 96 // offset for the height of the form above
          ,
          scrollTo: nodeIdToScrollTo === node.id
        }, /*#__PURE__*/React.createElement(TreeItem, {
          key: node.id,
          nodeId: node.id,
          classes: {
            content: classes.content,
            group: classes.group,
            label: classes.label,
            root: classes.treeItemRoot,
            selected: classes.selected
          },
          label: /*#__PURE__*/React.createElement("div", {
            className: clsx(_defineProperty({}, classes.visibleNode, visibleNodeIds.indexOf(node.id) !== -1))
          }, node.label),
          onClick: function onClick() {
            return _this.selectTreeItem(node);
          },
          onKeyDown: function onKeyDown(e) {
            return _this.handleKeyPressed(e, node);
          }
        }, node.nodes && node.nodes.length > 0 ? _this.buildTreeItems(node.nodes, visibleNodeIds, containerRef, nodeIdToScrollTo) : null));
      });
    }
    /** */

  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          classes = _this$props3.classes,
          treeStructure = _this$props3.treeStructure,
          visibleNodeIds = _this$props3.visibleNodeIds,
          expandedNodeIds = _this$props3.expandedNodeIds,
          containerRef = _this$props3.containerRef,
          nodeIdToScrollTo = _this$props3.nodeIdToScrollTo;

      if (!treeStructure) {
        return /*#__PURE__*/React.createElement(React.Fragment, null);
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TreeView, {
        className: classes.root,
        defaultCollapseIcon: /*#__PURE__*/React.createElement(ExpandMoreIcon, {
          color: "action"
        }),
        defaultExpandIcon: /*#__PURE__*/React.createElement(ChevronRightIcon, {
          color: "action"
        }),
        defaultEndIcon: /*#__PURE__*/React.createElement(React.Fragment, null),
        expanded: expandedNodeIds
      }, this.buildTreeItems(treeStructure.nodes, visibleNodeIds, containerRef, nodeIdToScrollTo)));
    }
  }]);

  return SidebarIndexTableOfContents;
}(Component);