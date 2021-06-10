"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWindowManifests = getWindowManifests;
exports.getWindows = getWindows;
exports.getWindow = getWindow;
exports.getWorkspace = getWorkspace;
exports.getManifests = getManifests;
exports.getManifest = getManifest;
exports.getCatalog = getCatalog;
exports.getWindowIds = exports.getViewer = void 0;

var _reselect = require("reselect");

var _utils = require("./utils");

/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */
function getWindowManifests(state) {
  return Object.values((0, _utils.miradorSlice)(state).windows).map(function (window) {
    return window.manifestId;
  });
}
/** */


function getWindows(state) {
  return (0, _utils.miradorSlice)(state).windows || {};
}
/** */


function getWindow(state, _ref) {
  var windowId = _ref.windowId;
  return getWindows(state)[windowId];
}

var getViewer = (0, _reselect.createSelector)([function (state) {
  return (0, _utils.miradorSlice)(state).viewers;
}, function (state, _ref2) {
  var windowId = _ref2.windowId;
  return windowId;
}], function (viewers, windowId) {
  return viewers[windowId];
});
/** */

exports.getViewer = getViewer;

function getWorkspace(state) {
  return (0, _utils.miradorSlice)(state).workspace;
}
/** */


var getWindowIds = (0, _reselect.createSelector)([getWorkspace], function (_ref3) {
  var windowIds = _ref3.windowIds;
  return windowIds || [];
});
/** */

exports.getWindowIds = getWindowIds;

function getManifests(state) {
  return (0, _utils.miradorSlice)(state).manifests || {};
}
/** Get the relevant manifest information */


function getManifest(state, _ref4) {
  var manifestId = _ref4.manifestId,
      windowId = _ref4.windowId;
  var manifests = getManifests(state);
  return manifests && manifests[manifestId || windowId && (getWindow(state, {
    windowId: windowId
  }) || {}).manifestId];
}
/** */


function getCatalog(state) {
  return (0, _utils.miradorSlice)(state).catalog || {};
}