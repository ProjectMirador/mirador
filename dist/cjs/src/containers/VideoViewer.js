"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactI18next = require("react-i18next");

var _core = require("@material-ui/core");

var _withPlugins = require("../extend/withPlugins");

var _VideoViewer = require("../components/VideoViewer");

var _selectors = require("../state/selectors");

/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    captions: (0, _selectors.getVisibleCanvasCaptions)(state, {
      windowId: windowId
    }) || [],
    videoResources: (0, _selectors.getVisibleCanvasVideoResources)(state, {
      windowId: windowId
    }) || []
  };
};
/** */


var styles = function styles() {
  return {
    container: {
      alignItems: 'center',
      display: 'flex',
      width: '100%'
    },
    video: {
      maxHeight: '100%',
      width: '100%'
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, null), (0, _withPlugins.withPlugins)('VideoViewer'));

var _default = enhance(_VideoViewer.VideoViewer);

exports["default"] = _default;