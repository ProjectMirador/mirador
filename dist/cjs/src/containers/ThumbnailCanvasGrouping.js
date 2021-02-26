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

var _ThumbnailCanvasGrouping = require("../components/ThumbnailCanvasGrouping");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailCanvasGrouping
 * @private
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
  var data = _ref.data;
  return {
    setCanvas: function setCanvas() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return dispatch(actions.setCanvas.apply(actions, [data.windowId].concat(args)));
    }
  };
};
/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailCanvasGrouping
 * @private
 */


var mapStateToProps = function mapStateToProps(state, _ref2) {
  var data = _ref2.data;
  return {
    currentCanvasId: ((0, _selectors.getCurrentCanvas)(state, {
      windowId: data.windowId
    }) || {}).id
  };
};
/**
 * Styles for withStyles HOC
 */


var styles = function styles(theme) {
  return {
    canvas: {
      '&$currentCanvas': {
        outline: "2px solid ".concat(theme.palette.primary.main),
        outlineOffset: '3px'
      },
      '&:hover': {
        outline: "9px solid ".concat(theme.palette.action.hover),
        outlineOffset: '-2px'
      },
      boxSizing: 'border-box',
      color: theme.palette.common.white,
      cursor: 'pointer',
      display: 'inline-block',
      outline: 0,
      whiteSpace: 'nowrap'
    },
    currentCanvas: {}
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('ThumbnailCanvasGrouping'));

var _default = enhance(_ThumbnailCanvasGrouping.ThumbnailCanvasGrouping);

exports["default"] = _default;