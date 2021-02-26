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

var _MinimalWindow = require("../components/MinimalWindow");

var _selectors = require("../state/selectors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** mapStateToProps */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    allowClose: (0, _selectors.getWindowConfig)(state, {
      windowId: windowId
    }).allowClose,
    allowWindowSideBar: (0, _selectors.getWindowConfig)(state, {
      windowId: windowId
    }).allowWindowSideBar
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    removeWindow: function removeWindow() {
      return dispatch(actions.removeWindow(windowId));
    }
  };
};
/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */


var styles = function styles(theme) {
  return {
    button: {
      marginLeft: 'auto'
    },
    title: _objectSpread(_objectSpread({}, theme.typography.h6), {}, {
      flexGrow: 1,
      paddingLeft: theme.spacing(0.5)
    }),
    window: {
      backgroundColor: theme.palette.shades.dark,
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      overflow: 'hidden',
      width: '100%'
    },
    windowTopBarStyle: {
      backgroundColor: theme.palette.shades.main,
      borderTop: '2px solid transparent',
      minHeight: 32,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5)
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('MinimalWindow'));

var _default = enhance(_MinimalWindow.MinimalWindow);

exports["default"] = _default;