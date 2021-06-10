"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _styles = require("@material-ui/core/styles");

var _withPlugins = require("../extend/withPlugins");

var _WorkspaceControlPanelButtons = require("../components/WorkspaceControlPanelButtons");

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
var styles = function styles(theme) {
  return {
    ctrlBtn: {
      margin: theme.spacing(1)
    }
  };
};

var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _withPlugins.withPlugins)('WorkspaceControlPanelButtons'));

var _default = enhance(_WorkspaceControlPanelButtons.WorkspaceControlPanelButtons);

exports["default"] = _default;