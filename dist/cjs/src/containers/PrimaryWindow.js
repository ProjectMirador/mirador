"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _styles = require("@material-ui/core/styles");

var _withPlugins = require("../extend/withPlugins");

var _selectors = require("../state/selectors");

var _PrimaryWindow = require("../components/PrimaryWindow");

/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  var manifestoInstance = (0, _selectors.getManifestoInstance)(state, {
    windowId: windowId
  });
  return {
    audioResources: (0, _selectors.getVisibleCanvasAudioResources)(state, {
      windowId: windowId
    }) || [],
    isCollection: manifestoInstance && manifestoInstance.isCollection(),
    isCollectionDialogVisible: (0, _selectors.getWindow)(state, {
      windowId: windowId
    }).collectionDialogOn,
    videoResources: (0, _selectors.getVisibleCanvasVideoResources)(state, {
      windowId: windowId
    }) || []
  };
};

var styles = {
  primaryWindow: {
    display: 'flex',
    flex: 1,
    position: 'relative'
  }
};
var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, null), (0, _withPlugins.withPlugins)('PrimaryWindow'));

var _default = enhance(_PrimaryWindow.PrimaryWindow);

exports["default"] = _default;