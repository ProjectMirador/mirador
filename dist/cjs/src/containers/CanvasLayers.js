"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var actions = _interopRequireWildcard(require("../state/actions"));

var _selectors = require("../state/selectors");

var _CanvasLayers = require("../components/CanvasLayers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** For connect */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var canvasId = _ref.canvasId,
      windowId = _ref.windowId;
  return {
    label: (0, _selectors.getCanvasLabel)(state, {
      canvasId: canvasId,
      windowId: windowId
    }),
    layerMetadata: (0, _selectors.getLayers)(state, {
      canvasId: canvasId,
      windowId: windowId
    }),
    layers: (0, _selectors.getSortedLayers)(state, {
      canvasId: canvasId,
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */


var mapDispatchToProps = {
  updateLayers: actions.updateLayers
};
/** For withStlyes */

var styles = function styles(theme) {
  return {
    dragging: {},
    dragHandle: {
      alignItems: 'center',
      borderRight: "0.5px solid ".concat(theme.palette.divider),
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      marginBottom: -1 * theme.spacing(2) + 0.5,
      marginRight: theme.spacing(1),
      marginTop: -1 * theme.spacing(2),
      maxWidth: theme.spacing(3),
      width: theme.spacing(3)
    },
    image: {
      borderBottom: "1px solid ".concat(theme.palette.divider)
    },
    label: {
      paddingLeft: theme.spacing(1)
    },
    list: {
      paddingTop: 0
    },
    listItem: {
      '& $dragHandle': {
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        },
        backgroundColor: theme.palette.shades.light
      },
      '&$dragging': {
        '& $dragHandle, & $dragHandle:hover': {
          backgroundColor: theme.palette.action.selected
        },
        backgroundColor: theme.palette.action.hover
      },
      alignItems: 'stretch',
      borderBottom: "0.5px solid ".concat(theme.palette.divider),
      cursor: 'pointer',
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    },
    opacityIcon: {
      marginRight: theme.spacing(0.5)
    },
    opacityInput: _objectSpread(_objectSpread({}, theme.typography.caption), {}, {
      '&::-webkit-outer-spin-button,&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      },
      '-moz-appearance': 'textfield',
      textAlign: 'right',
      width: '3ch'
    }),
    sectionHeading: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    },
    slider: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      maxWidth: 150
    },
    thumbnail: {
      minWidth: 50
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps));

var _default = enhance(_CanvasLayers.CanvasLayers);

exports["default"] = _default;