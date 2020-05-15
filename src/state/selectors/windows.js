import { createSelector } from 'reselect';
import {
  getManifestTitle,
  getManifestBehaviors,
  getManifestViewingHint,
  getManifestoInstance,
} from './manifests';
import { getDefaultView, getViewConfigs } from './config';
import { getWorkspaceType } from './workspace';

/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */
export function getWindowTitles(state) {
  const result = {};

  Object.keys(getWindows(state)).forEach((windowId) => {
    result[windowId] = getManifestTitle(state, { windowId });
  });

  return result;
}

/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */
export function getWindowManifests(state) {
  return Object.values(state.windows).map(window => window.manifestId);
}

/** */
export function getWindows(state) {
  return state.windows || {};
}

/** */
export const getWindowIds = createSelector(
  [getWindows],
  windows => Object.keys(windows),
);

/** */
export const getMaximizedWindowsIds = createSelector(
  [getWindows],
  windows => Object.values(windows)
    .filter(window => window.maximized === true)
    .map(window => window.id),
);

/** */
export function getWindow(state, { windowId }) {
  return getWindows(state)[windowId];
}

/** Return the canvas index for a certain window.
* @param {object} state
* @param {String} windowId
* @param {Number}
*/
export const getCanvasIndex = createSelector(
  [
    getWindow,
    getManifestoInstance,
  ],
  (window, manifest) => (
    (manifest && window && window.canvasId
      && manifest.getSequences()[0].getCanvasById(window.canvasId))
    || {}).index || 0,
);

/** Return type of view in a certain window.
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {String}
*/
export const getWindowViewType = createSelector(
  [
    getWindow,
    getManifestViewingHint,
    getManifestBehaviors,
    getDefaultView,
    getViewConfigs,
  ],
  (window, manifestViewingHint, manifestBehaviors, defaultView, viewConfig) => {
    if (window && window.view) return window.view;

    const config = viewConfig.find(view => (
      view.behaviors
      && view.behaviors.some(b => manifestViewingHint === b || manifestBehaviors.includes(b))
    ));

    return (config && config.key) || defaultView;
  },
);

/** */
export const getAllowedWindowViewTypes = createSelector(
  [
    getManifestViewingHint,
    getManifestBehaviors,
    getDefaultView,
    getViewConfigs,
  ],
  (manifestViewingHint, manifestBehaviors, defaultView, viewConfig) => (
    viewConfig.reduce((allowedViews, view) => {
      if (
        view.key === defaultView
        || !view.behaviors
        || view.behaviors.some(b => (
          manifestViewingHint === b || manifestBehaviors.includes(b)
        ))) allowedViews.push(view.key);
      return allowedViews;
    }, [])
  ),
);

export const getViewer = createSelector(
  [
    state => state.viewers,
    (state, { windowId }) => windowId,
  ],
  (viewers, windowId) => viewers[windowId],
);

/**
 * Returns the draggability of a window
 * @param {object} state
 * @param {object} props
 * @return {Boolean}
 */
export const getWindowDraggability = createSelector(
  [
    getWorkspaceType,
    getWindow,
    state => Object.keys(state.windows).length > 1,
  ],
  (workspaceType, window, manyWindows) => {
    if (workspaceType === 'elastic') return true;
    return manyWindows && window && window.maximized === false;
  },
);
