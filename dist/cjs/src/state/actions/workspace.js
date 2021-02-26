"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWorkspace = updateWorkspace;
exports.setWorkspaceFullscreen = setWorkspaceFullscreen;
exports.toggleZoomControls = toggleZoomControls;
exports.updateWorkspaceMosaicLayout = updateWorkspaceMosaicLayout;
exports.setWorkspaceAddVisibility = setWorkspaceAddVisibility;
exports.setWorkspaceViewportPosition = setWorkspaceViewportPosition;
exports.setWorkspaceViewportDimensions = setWorkspaceViewportDimensions;
exports.toggleDraggingEnabled = toggleDraggingEnabled;

var _actionTypes = _interopRequireDefault(require("./action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * updateWorkspace - action creator
 *
 * @param {Object} config
 */
function updateWorkspace(config) {
  return {
    config: config,
    type: _actionTypes["default"].UPDATE_WORKSPACE
  };
}
/**
 * setWorkspaceFullscreen - action creator
 *
 * @param  {Boolean} isFullscreenEnabled
 * @memberof ActionCreators
 */


function setWorkspaceFullscreen(isFullscreenEnabled) {
  return {
    isFullscreenEnabled: isFullscreenEnabled,
    type: _actionTypes["default"].SET_WORKSPACE_FULLSCREEN
  };
}
/**
 * toggleZoomControls - action creator
 * @param {Boolean} showZoomControls
 * @memberof ActionCreators
*/


function toggleZoomControls(showZoomControls) {
  return {
    showZoomControls: showZoomControls,
    type: _actionTypes["default"].TOGGLE_ZOOM_CONTROLS
  };
}
/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} layout
 * @memberof ActionCreators
 */


function updateWorkspaceMosaicLayout(layout) {
  return {
    layout: layout,
    type: _actionTypes["default"].UPDATE_WORKSPACE_MOSAIC_LAYOUT
  };
}
/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} isWorkspaceAddVisible
 * @memberof ActionCreators
 */


function setWorkspaceAddVisibility(isWorkspaceAddVisible) {
  return {
    isWorkspaceAddVisible: isWorkspaceAddVisible,
    type: _actionTypes["default"].SET_WORKSPACE_ADD_VISIBILITY
  };
}
/**
 * setWorkspaceViewportPosition - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */


function setWorkspaceViewportPosition(_ref) {
  var x = _ref.x,
      y = _ref.y;
  return {
    payload: {
      position: {
        x: x,
        y: y
      }
    },
    type: _actionTypes["default"].SET_WORKSPACE_VIEWPORT_POSITION
  };
}
/**
 * setWorkspaceViewportDimensions - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */


function setWorkspaceViewportDimensions(_ref2) {
  var width = _ref2.width,
      height = _ref2.height;
  return {
    payload: {
      position: {
        height: height,
        width: width
      }
    },
    type: _actionTypes["default"].SET_WORKSPACE_VIEWPORT_POSITION
  };
}
/**
 * toggleDraggingEnabled - action creator
 */


function toggleDraggingEnabled() {
  return {
    type: _actionTypes["default"].TOGGLE_DRAGGING
  };
}