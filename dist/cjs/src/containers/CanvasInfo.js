"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _withPlugins = require("../extend/withPlugins");

var _selectors = require("../state/selectors");

var _CanvasInfo = require("../components/CanvasInfo");

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var canvasId = _ref.canvasId,
      id = _ref.id,
      windowId = _ref.windowId;
  return {
    canvasDescription: (0, _selectors.getCanvasDescription)(state, {
      canvasId: canvasId,
      companionWindowId: id,
      windowId: windowId
    }),
    canvasLabel: (0, _selectors.getCanvasLabel)(state, {
      canvasId: canvasId,
      companionWindowId: id,
      windowId: windowId
    }),
    canvasMetadata: (0, _selectors.getDestructuredMetadata)((0, _selectors.getCanvas)(state, {
      canvasId: canvasId,
      companionWindowId: id,
      windowId: windowId
    }))
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps), (0, _withPlugins.withPlugins)('CanvasInfo'));

var _default = enhance(_CanvasInfo.CanvasInfo);

exports["default"] = _default;