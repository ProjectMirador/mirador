"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _withPlugins = require("../extend/withPlugins");

var _WindowViewer = require("../components/WindowViewer");

var enhance = (0, _redux.compose)((0, _withPlugins.withPlugins)('WindowViewer') // further HOC go here
);

var _default = enhance(_WindowViewer.WindowViewer);

exports["default"] = _default;