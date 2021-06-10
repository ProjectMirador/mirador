"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _core = require("@material-ui/core");

var _withPlugins = require("../extend/withPlugins");

var _WindowTopBarPluginArea = require("../components/WindowTopBarPluginArea");

/**
 */
var styles = {};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactRedux.connect)(null, null), (0, _withPlugins.withPlugins)('WindowTopBarPluginArea'));

var _default = enhance(_WindowTopBarPluginArea.WindowTopBarPluginArea);

exports["default"] = _default;