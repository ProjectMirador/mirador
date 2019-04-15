import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import { getWindow, getWindows } from './windows';


/** */
export function getCompanionWindows(state) {
  return state.companionWindows;
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

/**
* Return compantion window ids from a window
* @param {String} windowId
* @return {Array}
*/
const getCompanionWindowIndexByWindowAndPosition = createSelector(
  [getWindows, getCompanionWindows],
  (windows, companionWindows) => (
    (Object.keys(windows) || []).reduce((obj, id) => (
      {
        ...obj,
        [id]: groupBy(
          windows[id].companionWindowIds,
          cwid => companionWindows[cwid] && companionWindows[cwid].position,
        ),
      }), {})
  ),
);

/**
* Return compantion window ids from a window
* @param {String} windowId
* @return {Array}
*/
const getCompanionWindowsByWindowAndPosition = createSelector(
  [getWindows, getCompanionWindows],
  (windows, companionWindows) => (
    (Object.keys(windows) || []).reduce((obj, id) => ({
      ...obj,
      [id]: groupBy(
        windows[id].companionWindowIds.map(cwid => companionWindows[cwid]),
        cw => cw.position,
      ),
    }), {})
  ),
);

export const getCompanionWindow = createSelector(
  [
    getCompanionWindows,
    (state, { companionWindowId }) => companionWindowId,
  ],
  (companionWindows, companionWindowId) => companionWindows[companionWindowId],
);

/**
 * Return companion windows of a window
 * @param {String} windowId
 * @return {Array}
 */
const getCompanionWindowsOfWindow = createSelector(
  [(state, { windowId }) => windowId, getCompanionWindowsByWindowAndPosition],
  (windowId, companionWindows) => companionWindows[windowId] || {},
);

/**
 * Return companion windows of a window
 * @param {String} windowId
 * @return {Array}
 */
const getCompanionWindowIdsOfWindow = createSelector(
  [(state, { windowId }) => windowId, getCompanionWindowIndexByWindowAndPosition],
  (windowId, companionWindowIds) => companionWindowIds[windowId] || {},
);

/**
* Return the companion window string from state in a given windowId and position
* @param {object} state
* @param {String} windowId
* @param {String} position
* @return {String}
*/
export const getCompanionWindowsForPosition = createSelector(
  [
    getCompanionWindowsOfWindow,
    (state, { position }) => ({ position }),
  ],
  (companionWindows, { position }) => companionWindows[position] || EMPTY_ARRAY,
);

const EMPTY_ARRAY = [];

/** */
export const getCompanionWindowIdsForPosition = createSelector(
  [
    getCompanionWindowIdsOfWindow,
    (state, { position }) => ({ position }),
  ],
  (companionWindowIds, { position }) => companionWindowIds[position] || EMPTY_ARRAY,
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
  (position, window) => {
    if (!window) return false;
    const { companionAreaOpen, sideBarOpen } = window;
    if (position !== 'left') return true;
    return !!(companionAreaOpen && sideBarOpen);
  },
);

export const selectCompanionWindowDimensions = createSelector(
  [getCompanionWindowsOfWindow],
  (companionWindows) => {
    let width = 0;
    let height = 0;
    [].concat(...Object.values(companionWindows)).forEach((cw) => {
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
