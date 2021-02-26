"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var actions = _interopRequireWildcard(require("../state/actions"));

var _withPlugins = require("../extend/withPlugins");

var _selectors = require("../state/selectors");

var _AnnotationSettings = require("../components/AnnotationSettings");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Mapping redux state to component props using connect
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    displayAll: (0, _selectors.getWindow)(state, {
      windowId: windowId
    }).highlightAllAnnotations,
    displayAllDisabled: (0, _selectors.getAnnotationResourcesByMotivation)(state, {
      windowId: windowId
    }).length < 2
  };
};
/**
 * Mapping redux action dispatches to component props using connect
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    toggleAnnotationDisplay: function toggleAnnotationDisplay() {
      dispatch(actions.toggleAnnotationDisplay(windowId));
    }
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('AnnotationSettings'));

var _default = enhance(_AnnotationSettings.AnnotationSettings);

exports["default"] = _default;