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

var _ErrorContent = require("../components/ErrorContent");

var _selectors = require("../state/selectors");

/** mapStateToProps */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var companionWindowId = _ref.companionWindowId,
      windowId = _ref.windowId;
  return {
    metadata: {
      companionWindow: companionWindowId && (0, _selectors.getCompanionWindow)(state, {
        companionWindowId: companionWindowId
      }),
      manifest: (0, _selectors.getManifest)(state, {
        windowId: windowId
      }),
      viewer: (0, _selectors.getViewer)(state, {
        windowId: windowId
      }),
      window: (0, _selectors.getWindow)(state, {
        windowId: windowId
      })
    },
    showJsError: (0, _selectors.getConfig)(state).window.showJsError
  };
};
/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */


var styles = function styles(theme) {
  return {
    alert: {
      '& $icon': {
        color: theme.palette.error.main
      },
      backgroundColor: theme.palette.error.main,
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium
    },
    details: {
      '& pre': {
        height: '100px',
        overflowY: 'scroll'
      },
      flexDirection: 'column'
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps), (0, _withPlugins.withPlugins)('ErrorContent'));

var _default = enhance(_ErrorContent.ErrorContent);

exports["default"] = _default;