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

var _selectors = require("../state/selectors");

var _WindowListButton = require("../components/WindowListButton");

/** */
var mapStateToProps = function mapStateToProps(state) {
  return {
    disabled: (0, _selectors.getWorkspace)(state).isWorkspaceAddVisible,
    windowCount: (0, _selectors.getWindowIds)(state).length
  };
};
/**
 *
 * @param theme
 * @returns {{background: {background: string}}}
 */


var styles = function styles(theme) {
  return {
    badge: {
      paddingLeft: 12
    },
    ctrlBtn: {
      margin: theme.spacing(1)
    },
    ctrlBtnSelected: {
      backgroundColor: theme.palette.action.selected
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, null), (0, _withPlugins.withPlugins)('WindowListButton'));

var _default = enhance(_WindowListButton.WindowListButton);

exports["default"] = _default;