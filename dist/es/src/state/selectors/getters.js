import { createSelector } from 'reselect';
import { miradorSlice } from './utils';
/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */

export function getWindowManifests(state) {
  return Object.values(miradorSlice(state).windows).map(function (window) {
    return window.manifestId;
  });
}
/** */

export function getWindows(state) {
  return miradorSlice(state).windows || {};
}
/** */

export function getWindow(state, _ref) {
  var windowId = _ref.windowId;
  return getWindows(state)[windowId];
}
export var getViewer = createSelector([function (state) {
  return miradorSlice(state).viewers;
}, function (state, _ref2) {
  var windowId = _ref2.windowId;
  return windowId;
}], function (viewers, windowId) {
  return viewers[windowId];
});
/** */

export function getWorkspace(state) {
  return miradorSlice(state).workspace;
}
/** */

export var getWindowIds = createSelector([getWorkspace], function (_ref3) {
  var windowIds = _ref3.windowIds;
  return windowIds || [];
});
/** */

export function getManifests(state) {
  return miradorSlice(state).manifests || {};
}
/** Get the relevant manifest information */

export function getManifest(state, _ref4) {
  var manifestId = _ref4.manifestId,
      windowId = _ref4.windowId;
  var manifests = getManifests(state);
  return manifests && manifests[manifestId || windowId && (getWindow(state, {
    windowId: windowId
  }) || {}).manifestId];
}
/** */

export function getCatalog(state) {
  return miradorSlice(state).catalog || {};
}