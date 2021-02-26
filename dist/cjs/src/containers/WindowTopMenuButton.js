"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactI18next = require("react-i18next");

var _core = require("@material-ui/core");

var _withPlugins = require("../extend/withPlugins");

var _WindowTopMenuButton = require("../components/WindowTopMenuButton");

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
var styles = function styles(theme) {
  return {
    ctrlBtnSelected: {
      backgroundColor: theme.palette.action.selected
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _withPlugins.withPlugins)('WindowTopMenuButtons'));

var _default = enhance(_WindowTopMenuButton.WindowTopMenuButton);

exports["default"] = _default;