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

var actions = _interopRequireWildcard(require("../state/actions"));

var _selectors = require("../state/selectors");

var _WindowSideBarInfoPanel = require("../components/WindowSideBarInfoPanel");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  return {
    availableLocales: (0, _selectors.getMetadataLocales)(state, {
      companionWindowId: id,
      windowId: windowId
    }),
    canvasIds: (0, _selectors.getVisibleCanvasIds)(state, {
      windowId: windowId
    }),
    collectionPath: ((0, _selectors.getWindow)(state, {
      windowId: windowId
    }) || {}).collectionPath,
    locale: (0, _selectors.getCompanionWindow)(state, {
      companionWindowId: id
    }).locale || (0, _selectors.getManifestLocale)(state, {
      windowId: windowId
    }),
    showLocalePicker: (0, _selectors.getWindowConfig)(state, {
      windowId: windowId
    }).showLocalePicker
  };
};
/** */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId,
      id = _ref2.id;
  return {
    setLocale: function setLocale(locale) {
      return dispatch(actions.updateCompanionWindow(windowId, id, {
        locale: locale
      }));
    }
  };
};
/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */


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

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WindowSideBarInfoPanel'));

var _default = enhance(_WindowSideBarInfoPanel.WindowSideBarInfoPanel);

exports["default"] = _default;