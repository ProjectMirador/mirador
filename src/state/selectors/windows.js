import { createSelector } from 'reselect';
import { getManifestTitle } from './manifests';
import { getWorkspaceType } from './config';

/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */
export function getWindowTitles(state) {
  const result = {};

  Object.keys(state.windows).forEach((windowId) => {
    result[windowId] = getManifestTitle(state, { windowId });
  });

  return result;
}

/** */
export function getWindow(state, { windowId }) {
  return state.windows && state.windows[windowId];
}

export const getCanvasIndex = createSelector(
  [
    getWindow,
    (state, { canvasIndex }) => canvasIndex,
  ],
  (window, canvasIndex) => (
    canvasIndex === 'selected' || canvasIndex === undefined
      ? window.canvasIndex
      : canvasIndex
  ),
);

/** Return position of thumbnail navigation in a certain window.
* @param {object} state
* @param {String} windowId
* @param {String}
*/
export const getThumbnailNavigationPosition = createSelector(
  [
    getWindow,
    state => state.companionWindows,
  ],
  (window, companionWindows) => window
    && companionWindows[window.thumbnailNavigationId]
    && companionWindows[window.thumbnailNavigationId].position,
);

/** Return type of view in a certain window.
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {String}
*/
export const getWindowViewType = createSelector(
  [getWindow],
  window => window && window.view,
);

/**
* Return compantion window ids from a window
* @param {String} windowId
* @return {Array}
*/
export const getCompanionWindowIds = createSelector(
  [getWindow],
  window => (window && window.companionWindowIds) || [],
);

export const getCompanionWindow = createSelector(
  [
    state => state.companionWindows,
    (state, { companionWindowId }) => companionWindowId,
  ],
  (companionWindows, companionWindowId) => companionWindows[companionWindowId],
);

/**
 * Return companion windows of a window
 * @param {String} windowId
 * @return {Array}
 */
export const getCompanionWindowsOfWindow = createSelector(
  [getCompanionWindowIds, state => state.companionWindows],
  (companionWindowIds, companionWindows) => companionWindowIds.map(id => companionWindows[id]),
);

/**
* Return the companion window string from state in a given windowId and position
* @param {object} state
* @param {String} windowId
* @param {String} position
* @return {String}
*/
export const getCompanionWindowForPosition = createSelector(
  [getCompanionWindowsOfWindow, (state, { position }) => position],
  (companionWindows, position) => companionWindows.find(cw => cw.position === position),
);

export const getViewer = createSelector(
  [
    state => state.viewers,
    (state, { windowId }) => windowId,
  ],
  (viewers, windowId) => viewers[windowId],
);

/**
 * Returns the visibility of the companion area
 * @param {object} state
 * @param {object} props
 * @return {Boolean}
 */
export const getCompanionAreaVisibility = createSelector(
  [
    (state, { position }) => position,
    getWindow,
  ],
  (position, { companionAreaOpen, sideBarOpen }) => {
    if (position !== 'left') return true;
    return !!(companionAreaOpen && sideBarOpen);
  },
);

export const selectCompanionWindowDimensions = createSelector(
  [getCompanionWindowsOfWindow],
  (companionWindows) => {
    let width = 0;
    let height = 0;

    companionWindows.forEach((cw) => {
      if (cw.position.match(/right/)) {
        width += 235;
      }

      if (cw.position.match(/bottom/)) {
        height += 201;
      }
    });

    return { height, width };
  },
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
