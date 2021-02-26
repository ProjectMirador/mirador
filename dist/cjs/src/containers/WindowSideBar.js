"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _core = require("@material-ui/core");

var _reactI18next = require("react-i18next");

var _withPlugins = require("../extend/withPlugins");

var _WindowSideBar = require("../components/WindowSideBar");

var _selectors = require("../state/selectors");

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBar
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    direction: (0, _selectors.getThemeDirection)(state),
    sideBarOpen: ((0, _selectors.getWindow)(state, {
      windowId: windowId
    }) || {}).sideBarOpen,
    sideBarPanel: ((0, _selectors.getWindow)(state, {
      windowId: windowId
    }) || {}).sideBarPanel
  };
};
/**
 *
 * @param theme
 * @returns {{toolbar: CSSProperties | toolbar | {minHeight}, grow: {flexGrow: number},
 * drawer: {overflowX: string, left: number, flexShrink: number, width: number, height: string}}}
 */


var styles = function styles(theme) {
  return {
    drawer: {
      flexShrink: 0,
      height: '100%',
      order: -1000,
      zIndex: theme.zIndex.appBar - 1
    },
    grow: {
      flexGrow: 1
    },
    paper: {
      borderInlineEnd: "1px solid ".concat(theme.palette.divider),
      overflowX: 'hidden',
      width: 48
    },
    toolbar: theme.mixins.toolbar
  };
};

var enhance = (0, _redux.compose)((0, _core.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, null), (0, _withPlugins.withPlugins)('WindowSideBar'));

var _default = enhance(_WindowSideBar.WindowSideBar);

exports["default"] = _default;