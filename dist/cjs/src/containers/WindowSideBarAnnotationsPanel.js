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

var _WindowSideBarAnnotationsPanel = require("../components/WindowSideBarAnnotationsPanel");

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    annotationCount: (0, _selectors.getAnnotationResourcesByMotivation)(state, {
      windowId: windowId
    }).length,
    canvasIds: (0, _selectors.getVisibleCanvasIds)(state, {
      windowId: windowId
    })
  };
};
/** */


var styles = function styles(theme) {
  return {
    section: {
      borderBottom: ".5px solid ".concat(theme.palette.section_divider),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, null), (0, _withPlugins.withPlugins)('WindowSideBarAnnotationsPanel') // further HOC
);

var _default = enhance(_WindowSideBarAnnotationsPanel.WindowSideBarAnnotationsPanel);

exports["default"] = _default;