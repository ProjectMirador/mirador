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

import React from 'react';
import { MosaicWithoutDragDropContext, MosaicWindow, getLeaves, createBalancedTreeFromLeaves } from 'react-mosaic-component';
import difference from 'lodash/difference';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import MosaicRenderPreview from '../containers/MosaicRenderPreview';
import Window from '../containers/Window';
import MosaicLayout from '../lib/MosaicLayout';
/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */

export var WorkspaceMosaic = /*#__PURE__*/function (_React$Component) {
  _inherits(WorkspaceMosaic, _React$Component);

  var _super = _createSuper(WorkspaceMosaic);

  /**
   */
  function WorkspaceMosaic(props) {
    var _this;

    _classCallCheck(this, WorkspaceMosaic);

    _this = _super.call(this, props);
    _this.tileRenderer = _this.tileRenderer.bind(_assertThisInitialized(_this));
    _this.mosaicChange = _this.mosaicChange.bind(_assertThisInitialized(_this));
    _this.determineWorkspaceLayout = _this.determineWorkspaceLayout.bind(_assertThisInitialized(_this));
    _this.zeroStateView = /*#__PURE__*/React.createElement("div", null);
    _this.windowPaths = {};
    _this.toolbarControls = [];
    _this.additionalControls = [];
    return _this;
  }
  /** */


  _createClass(WorkspaceMosaic, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var updateWorkspaceMosaicLayout = this.props.updateWorkspaceMosaicLayout;
      var newLayout = this.determineWorkspaceLayout();
      if (newLayout) updateWorkspaceMosaicLayout(newLayout);
    }
    /** */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          windowIds = _this$props.windowIds,
          layout = _this$props.layout,
          updateWorkspaceMosaicLayout = _this$props.updateWorkspaceMosaicLayout;
      var prevWindows = prevProps.windowIds; // Handles when Windows are added (not via Add Resource UI) Could be a workspace import

      if (!windowIds.every(function (e) {
        return prevWindows.includes(e);
      })) {
        var newLayout = this.determineWorkspaceLayout();
        if (!isEqual(newLayout, layout)) updateWorkspaceMosaicLayout(newLayout);
        return;
      } // Handles when Windows are removed from the state


      if (!prevWindows.every(function (e) {
        return windowIds.includes(e);
      })) {
        // There are no more remaining Windows, just return an empty layout
        if (windowIds.length === 0) {
          updateWorkspaceMosaicLayout(null);
          return;
        }

        var removedWindows = difference(prevWindows, windowIds);

        var _newLayout = new MosaicLayout(layout);

        _newLayout.removeWindows(removedWindows, this.windowPaths);

        updateWorkspaceMosaicLayout(_newLayout.layout);
      }
    }
    /**
     * bookkeepPath - used to book keep Window's path's
     * @param  {String} windowId   [description]
     * @param  {Array} path [description]
     */

  }, {
    key: "bookkeepPath",
    value: function bookkeepPath(windowId, path) {
      this.windowPaths[windowId] = path;
    }
    /**
     * Used to determine whether or not a "new" layout should be autogenerated.
     */

  }, {
    key: "determineWorkspaceLayout",
    value: function determineWorkspaceLayout() {
      var _this$props2 = this.props,
          windowIds = _this$props2.windowIds,
          layout = _this$props2.layout;
      var leaveKeys = getLeaves(layout); // Windows were added

      if (!windowIds.every(function (e) {
        return leaveKeys.includes(e);
      })) {
        // No current layout, so just generate a new one
        if (leaveKeys.length < 2) {
          return createBalancedTreeFromLeaves(windowIds);
        } // Add new windows to layout


        var addedWindows = difference(windowIds, leaveKeys);
        var newLayout = new MosaicLayout(layout);
        newLayout.addWindows(addedWindows);
        return newLayout.layout;
      } // Windows were removed (perhaps in a different Workspace). We don't have a
      // way to reconfigure.. so we have to random generate


      if (!leaveKeys.every(function (e) {
        return windowIds.includes(e);
      })) {
        return createBalancedTreeFromLeaves(windowIds);
      }

      return layout;
    }
    /** */

  }, {
    key: "tileRenderer",
    value:
    /**
     * Render a tile (Window) in the Mosaic.
     */
    function tileRenderer(id, path) {
      var _this$props3 = this.props,
          windowIds = _this$props3.windowIds,
          workspaceId = _this$props3.workspaceId;
      if (!windowIds.includes(id)) return null;
      this.bookkeepPath(id, path);
      return /*#__PURE__*/React.createElement(MosaicWindow, {
        toolbarControls: this.toolbarControls,
        additionalControls: this.additionalControls,
        path: path,
        windowId: id,
        renderPreview: WorkspaceMosaic.renderPreview
      }, /*#__PURE__*/React.createElement(Window, {
        key: "".concat(id, "-").concat(workspaceId),
        windowId: id
      }));
    }
    /**
     * Update the redux store when the Mosaic is changed.
     */

  }, {
    key: "mosaicChange",
    value: function mosaicChange(newLayout) {
      var updateWorkspaceMosaicLayout = this.props.updateWorkspaceMosaicLayout;
      updateWorkspaceMosaicLayout(newLayout);
    }
    /**
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          layout = _this$props4.layout,
          classes = _this$props4.classes;
      return /*#__PURE__*/React.createElement(MosaicWithoutDragDropContext, {
        renderTile: this.tileRenderer,
        initialValue: layout || this.determineWorkspaceLayout(),
        onChange: this.mosaicChange,
        className: classNames('mirador-mosaic', classes.root),
        zeroStateView: this.zeroStateView
      });
    }
  }], [{
    key: "renderPreview",
    value: function renderPreview(mosaicProps) {
      return /*#__PURE__*/React.createElement("div", {
        className: "mosaic-preview",
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement(MosaicRenderPreview, {
        windowId: mosaicProps.windowId
      }));
    }
  }]);

  return WorkspaceMosaic;
}(React.Component);
WorkspaceMosaic.defaultProps = {
  layout: undefined,
  windowIds: []
};