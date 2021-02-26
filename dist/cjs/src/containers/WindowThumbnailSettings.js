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

var _WindowThumbnailSettings = require("../components/WindowThumbnailSettings");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
var mapDispatchToProps = {
  setWindowThumbnailPosition: actions.setWindowThumbnailPosition
};
/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    direction: (0, _selectors.getThemeDirection)(state),
    thumbnailNavigationPosition: (0, _selectors.getThumbnailNavigationPosition)(state, {
      windowId: windowId
    })
  };
};
/** */


var styles = function styles(theme) {
  return {
    label: {
      borderBottom: '2px solid transparent'
    },
    MenuItem: {
      display: 'inline-block'
    },
    selectedLabel: {
      borderBottom: "2px solid ".concat(theme.palette.secondary.main),
      color: theme.palette.secondary.main
    }
  };
};

var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(null, {
  withRef: true
}), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
}), (0, _withPlugins.withPlugins)('WindowThumbnailSettings') // further HOC go here
);

var _default = enhance(_WindowThumbnailSettings.WindowThumbnailSettings);

exports["default"] = _default;