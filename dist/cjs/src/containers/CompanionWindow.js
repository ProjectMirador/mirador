"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _core = require("@material-ui/core");

var _reactSizeme = require("react-sizeme");

var _withPlugins = require("../extend/withPlugins");

var _withRef = require("../extend/withRef");

var actions = _interopRequireWildcard(require("../state/actions"));

var _selectors = require("../state/selectors");

var _CompanionWindow = require("../components/CompanionWindow");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  var companionWindow = (0, _selectors.getCompanionWindow)(state, {
    companionWindowId: id
  });

  var _getWindowConfig = (0, _selectors.getWindowConfig)(state, {
    windowId: windowId
  }),
      defaultSidebarPanelHeight = _getWindowConfig.defaultSidebarPanelHeight,
      defaultSidebarPanelWidth = _getWindowConfig.defaultSidebarPanelWidth;

  return _objectSpread(_objectSpread({}, companionWindow), {}, {
    defaultSidebarPanelHeight: defaultSidebarPanelHeight,
    defaultSidebarPanelWidth: defaultSidebarPanelWidth,
    direction: (0, _selectors.getThemeDirection)(state),
    isDisplayed: companionWindow && companionWindow.content && companionWindow.content.length > 0
  });
};
/**
 * mapDispatchToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId,
      id = _ref2.id;
  return {
    onCloseClick: function onCloseClick() {
      return dispatch(actions.removeCompanionWindow(windowId, id));
    },
    updateCompanionWindow: function updateCompanionWindow() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return dispatch(actions.updateCompanionWindow.apply(actions, [windowId, id].concat(args)));
    }
  };
};
/**
 *
 * @param theme
 * @returns {{closeButton: {top: number, position: string, right: number},
 * root: {overflowY: string, width: string}}}
 */


var styles = function styles(theme) {
  return {
    closeButton: {
      order: 4
    },
    'companionWindow-bottom': {
      borderTop: "0.5px solid ".concat(theme.palette.divider)
    },
    'companionWindow-left': {
      borderRight: "0.5px solid ".concat(theme.palette.divider)
    },
    'companionWindow-right': {
      borderLeft: "0.5px solid ".concat(theme.palette.divider)
    },
    companionWindowHeader: {
      flexWrap: 'wrap'
    },
    companionWindowTitleControls: {
      flexGrow: 1,
      order: 1000
    },
    companionWindowTitleControlsBottom: {
      order: 'unset'
    },
    content: {
      overflowY: 'auto',
      wordBreak: 'break-word'
    },
    horizontal: {},
    positionButton: {
      marginLeft: -16,
      order: -100,
      width: 24
    },
    rnd: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    },
    root: {
      boxShadow: 'none',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    },
    small: {},
    titleControls: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row wrap',
      minHeight: 48,
      order: 3
    },
    toolbar: {
      '&$small': {
        '& $closeButton': {
          order: 'unset'
        },
        '& $titleControls': {
          order: 'unset'
        }
      },
      alignItems: 'flex-start',
      background: theme.palette.shades.light,
      justifyContent: 'space-between',
      minHeight: 'max-content',
      paddingLeft: theme.spacing(2)
    },
    vertical: {},
    windowSideBarTitle: _objectSpread(_objectSpread({}, theme.typography.subtitle1), {}, {
      alignSelf: 'center',
      flexGrow: 1,
      width: 160
    })
  };
};

var enhance = (0, _redux.compose)((0, _withRef.withRef)(), (0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactSizeme.withSize)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('CompanionWindow'));

var _default = enhance(_CompanionWindow.CompanionWindow);

exports["default"] = _default;