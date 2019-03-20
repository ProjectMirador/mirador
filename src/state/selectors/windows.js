import { createSelector } from 'reselect';
import { getManifestTitle } from './manifests';

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
function getWindow(state, { windowId }) {
  return state.windows && state.windows[windowId];
}

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
