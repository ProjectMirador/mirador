"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactI18next = require("react-i18next");

var _withPlugins = require("../extend/withPlugins");

var actions = _interopRequireWildcard(require("../state/actions"));

var _selectors = require("../state/selectors");

var _WorkspaceMenu = require("../components/WorkspaceMenu");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WorkspaceMenu
 * @private
 */
var mapDispatchToProps = {
  toggleZoomControls: actions.toggleZoomControls
};
/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */

var mapStateToProps = function mapStateToProps(state) {
  return {
    containerId: (0, _selectors.getContainerId)(state),
    isWorkspaceAddVisible: (0, _selectors.getWorkspace)(state).isWorkspaceAddVisible,
    showThemePicker: (0, _selectors.getThemeIds)(state).length > 0,
    showZoomControls: (0, _selectors.getShowZoomControlsConfig)(state)
  };
};

var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WorkspaceMenu'));

var _default = enhance(_WorkspaceMenu.WorkspaceMenu);

exports["default"] = _default;