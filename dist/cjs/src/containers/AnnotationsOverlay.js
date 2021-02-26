"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _withPlugins = require("../extend/withPlugins");

var _AnnotationsOverlay = require("../components/AnnotationsOverlay");

var actions = _interopRequireWildcard(require("../state/actions"));

var _selectors = require("../state/selectors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    annotations: (0, _selectors.getPresentAnnotationsOnSelectedCanvases)(state, {
      windowId: windowId
    }),
    canvasWorld: (0, _selectors.getCurrentCanvasWorld)(state, {
      windowId: windowId
    }),
    drawAnnotations: (0, _selectors.getConfig)(state).window.forceDrawAnnotations || (0, _selectors.getCompanionWindowsForContent)(state, {
      content: 'annotations',
      windowId: windowId
    }).length > 0,
    drawSearchAnnotations: (0, _selectors.getConfig)(state).window.forceDrawAnnotations || (0, _selectors.getCompanionWindowsForContent)(state, {
      content: 'search',
      windowId: windowId
    }).length > 0,
    highlightAllAnnotations: (0, _selectors.getWindow)(state, {
      windowId: windowId
    }).highlightAllAnnotations,
    hoveredAnnotationIds: (0, _selectors.getWindow)(state, {
      windowId: windowId
    }).hoveredAnnotationIds,
    palette: (0, _selectors.getTheme)(state).palette,
    searchAnnotations: (0, _selectors.getSearchAnnotationsForWindow)(state, {
      windowId: windowId
    }),
    selectedAnnotationId: (0, _selectors.getSelectedAnnotationId)(state, {
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
  deselectAnnotation: actions.deselectAnnotation,
  hoverAnnotation: actions.hoverAnnotation,
  selectAnnotation: actions.selectAnnotation
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('AnnotationsOverlay'));

var _default = enhance(_AnnotationsOverlay.AnnotationsOverlay);

exports["default"] = _default;