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

var _SidebarIndexItem = require("../components/SidebarIndexItem");

/**
 * Styles for withStyles HOC
 */
var styles = function styles(theme) {
  return {
    label: {
      paddingLeft: theme.spacing(1)
    }
  };
};

var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(null, null), (0, _withPlugins.withPlugins)('SidebarIndexItem'));

var _default = enhance(_SidebarIndexItem.SidebarIndexItem);

exports["default"] = _default;