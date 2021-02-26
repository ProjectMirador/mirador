"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactSizeme = require("react-sizeme");

var _core = require("@material-ui/core");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _withPlugins = require("../extend/withPlugins");

var _selectors = require("../state/selectors");

var _WindowCanvasNavigationControls = require("../components/WindowCanvasNavigationControls");

/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    visible: (0, _selectors.getWorkspace)(state).focusedWindowId === windowId
  };
};
/**
 *
 * @param theme
 */


var styles = function styles(theme) {
  return {
    canvasNav: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      textAlign: 'center'
    },
    canvasNavStacked: {
      flexDirection: 'column'
    },
    controls: {
      backgroundColor: (0, _colorManipulator.fade)(theme.palette.background.paper, 0.5),
      bottom: 0,
      position: 'absolute',
      width: '100%',
      zIndex: 50
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps), (0, _core.withStyles)(styles), (0, _reactSizeme.withSize)(), (0, _withPlugins.withPlugins)('WindowCanvasNavigationControls'));

var _default = enhance(_WindowCanvasNavigationControls.WindowCanvasNavigationControls);

exports["default"] = _default;