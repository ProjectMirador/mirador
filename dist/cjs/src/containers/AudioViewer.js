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

var _AudioViewer = require("../components/AudioViewer");

var _selectors = require("../state/selectors");

/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    audioResources: (0, _selectors.getVisibleCanvasAudioResources)(state, {
      windowId: windowId
    }) || []
  };
};
/** */


var styles = function styles() {
  return {
    audio: {
      width: '100%'
    },
    container: {
      alignItems: 'center',
      display: 'flex',
      width: '100%'
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, null), (0, _withPlugins.withPlugins)('AudioViewer'));

var _default = enhance(_AudioViewer.AudioViewer);

exports["default"] = _default;