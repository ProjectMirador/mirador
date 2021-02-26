"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _withPlugins = require("../extend/withPlugins");

var _OpenSeadragonViewer = require("../components/OpenSeadragonViewer");

var actions = _interopRequireWildcard(require("../state/actions"));

var _selectors = require("../state/selectors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  var canvasWorld = (0, _selectors.getCurrentCanvasWorld)(state, {
    windowId: windowId
  });
  var infoResponses = (0, _selectors.selectInfoResponses)(state);
  var imageServiceIds = (0, _flatten["default"])(canvasWorld.canvases.map(function (c) {
    return c.imageServiceIds;
  }));
  return {
    canvasWorld: canvasWorld,
    drawAnnotations: (0, _selectors.getConfig)(state).window.forceDrawAnnotations || (0, _selectors.getCompanionWindowsForContent)(state, {
      content: 'annotations',
      windowId: windowId
    }).length > 0 || (0, _selectors.getCompanionWindowsForContent)(state, {
      content: 'search',
      windowId: windowId
    }).length > 0,
    infoResponses: imageServiceIds.map(function (id) {
      return infoResponses[id];
    }).filter(function (infoResponse) {
      return infoResponse !== undefined && infoResponse.isFetching === false && infoResponse.error === undefined;
    }),
    label: (0, _selectors.getCanvasLabel)(state, {
      canvasId: ((0, _selectors.getCurrentCanvas)(state, {
        windowId: windowId
      }) || {}).id,
      windowId: windowId
    }),
    nonTiledImages: (0, _selectors.getVisibleCanvasNonTiledResources)(state, {
      windowId: windowId
    }),
    osdConfig: (0, _selectors.getConfig)(state).osdConfig,
    viewerConfig: (0, _selectors.getViewer)(state, {
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */


var mapDispatchToProps = {
  updateViewport: actions.updateViewport
};
var styles = {
  osdContainer: {
    flex: 1,
    position: 'relative'
  }
};
var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('OpenSeadragonViewer'));

var _default = enhance(_OpenSeadragonViewer.OpenSeadragonViewer);

exports["default"] = _default;