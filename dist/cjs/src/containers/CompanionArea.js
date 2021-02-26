"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _core = require("@material-ui/core");

var _reactI18next = require("react-i18next");

var _withPlugins = require("../extend/withPlugins");

var _selectors = require("../state/selectors");

var actions = _interopRequireWildcard(require("../state/actions"));

var _CompanionArea = require("../components/CompanionArea");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId,
      position = _ref.position;
  return {
    companionAreaOpen: (0, _selectors.getCompanionAreaVisibility)(state, {
      position: position,
      windowId: windowId
    }),
    companionWindowIds: (0, _selectors.getCompanionWindowIdsForPosition)(state, {
      position: position,
      windowId: windowId
    }),
    direction: (0, _selectors.getThemeDirection)(state),
    sideBarOpen: ((0, _selectors.getWindow)(state, {
      windowId: windowId
    }) || {}).sideBarOpen
  };
};

var mapDispatchToProps = {
  setCompanionAreaOpen: actions.setCompanionAreaOpen
};
/** */

var styles = function styles(theme) {
  return {
    horizontal: {
      flexDirection: 'column',
      width: '100%'
    },
    left: {
      minWidth: 235
    },
    root: {
      display: 'flex',
      minHeight: 0,
      position: 'relative',
      zIndex: theme.zIndex.appBar - 2
    },
    toggle: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid ".concat(theme.palette.shades.dark),
      borderRadius: 0,
      height: '48px',
      left: '100%',
      marginTop: '1rem',
      padding: 2,
      position: 'absolute',
      width: '23px',
      zIndex: theme.zIndex.drawer
    },
    toggleButton: {
      marginBottom: 12,
      marginTop: 12,
      padding: 0
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('CompanionArea'));

var _default = enhance(_CompanionArea.CompanionArea);

exports["default"] = _default;