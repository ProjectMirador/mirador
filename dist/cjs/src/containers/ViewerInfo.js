"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var _withPlugins = require("../extend/withPlugins");

var _ViewerInfo = require("../components/ViewerInfo");

var _selectors = require("../state/selectors");

/**
 * mapStateToProps - to hook up connect
 * @memberof Window
 * @private
 */
var mapStateToProps = function mapStateToProps(state, props) {
  var windowId = props.windowId;
  var canvases = (0, _selectors.getCanvases)(state, {
    windowId: windowId
  });
  var canvasIndex = (0, _selectors.getCanvasIndex)(state, {
    windowId: windowId
  });
  var canvasId = ((0, _selectors.getCurrentCanvas)(state, {
    windowId: windowId
  }) || {}).id;
  return {
    canvasCount: canvases.length,
    canvasIndex: canvasIndex,
    canvasLabel: (0, _selectors.getCanvasLabel)(state, {
      canvasId: canvasId,
      windowId: windowId
    })
  };
};

var styles = {
  osdInfo: {
    order: 2,
    overflow: 'hidden',
    paddingBottom: 3,
    textOverflow: 'ellipsis',
    unicodeBidi: 'plaintext',
    whiteSpace: 'nowrap',
    width: '100%'
  }
};
var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, null), (0, _withPlugins.withPlugins)('ViewerInfo'));

var _default = enhance(_ViewerInfo.ViewerInfo);

exports["default"] = _default;