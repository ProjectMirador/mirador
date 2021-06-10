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

var _actions = require("../state/actions");

var _ManifestListItemError = require("../components/ManifestListItemError");

/** */
var mapDispatchToProps = {
  onDismissClick: _actions.removeResource,
  onTryAgainClick: _actions.fetchManifest
};
/**
 *
 * @param theme
 * @returns {{manifestIdText: {wordBreak: string},
 * errorIcon: {color: string, width: string, height: string}}}
 */

var styles = function styles(theme) {
  return {
    errorIcon: {
      color: theme.palette.error.main,
      height: '2rem',
      width: '2rem'
    },
    manifestIdText: {
      wordBreak: 'break-all'
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(null, mapDispatchToProps), (0, _withPlugins.withPlugins)('ManifestListItemError'));

var _default = enhance(_ManifestListItemError.ManifestListItemError);

exports["default"] = _default;