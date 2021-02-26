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

var _WorkspaceArea = require("../components/WorkspaceArea");

var _selectors = require("../state/selectors");

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    controlPanelVariant: (0, _selectors.getWorkspace)(state).isWorkspaceAddVisible || (0, _selectors.getWindowIds)(state).length > 0 ? undefined : 'wide',
    isWorkspaceAddVisible: (0, _selectors.getWorkspace)(state).isWorkspaceAddVisible,
    isWorkspaceControlPanelVisible: (0, _selectors.getConfig)(state).workspaceControlPanel.enabled,
    lang: (0, _selectors.getConfig)(state).language
  };
};
/**
 *
 * @param theme
 * @returns {{background: {background: string}}}
 */


var styles = function styles(theme) {
  var getBackgroundColor = theme.palette.type === 'light' ? _styles.darken : _styles.lighten;
  return {
    viewer: {
      background: getBackgroundColor(theme.palette.shades.light, 0.1),
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps), (0, _withPlugins.withPlugins)('WorkspaceArea'));

var _default = enhance(_WorkspaceArea.WorkspaceArea);

exports["default"] = _default;