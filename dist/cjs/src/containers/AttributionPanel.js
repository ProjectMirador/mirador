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

var _AttributionPanel = require("../components/AttributionPanel");

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  return {
    manifestLogo: (0, _selectors.getManifestLogo)(state, {
      windowId: windowId
    }),
    requiredStatement: (0, _selectors.getRequiredStatement)(state, {
      windowId: windowId
    }),
    rights: (0, _selectors.getRights)(state, {
      windowId: windowId
    })
  };
};
/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */


var styles = function styles(theme) {
  return {
    logo: {
      maxWidth: '100%'
    },
    placeholder: {
      backgroundColor: theme.palette.grey[300]
    },
    section: {
      borderBottom: ".5px solid ".concat(theme.palette.section_divider),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    }
  };
};

var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps), (0, _withPlugins.withPlugins)('AttributionPanel'));

var _default = enhance(_AttributionPanel.AttributionPanel);

exports["default"] = _default;