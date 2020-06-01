import { createSelector } from 'reselect';

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
export function getWindow(state, { windowId }) {
  return getWindows(state)[windowId];
}

export const getViewer = createSelector(
  [
    state => state.viewers,
    (state, { windowId }) => windowId,
  ],
  (viewers, windowId) => viewers[windowId],
);

/** */
export const getWindowIds = createSelector(
  [getWindows],
  windows => Object.keys(windows),
);

/** */
export function getManifests(state) {
  return state.manifests || {};
}

/** Get the relevant manifest information */
export function getManifest(state, { manifestId, windowId }) {
  const manifests = getManifests(state);
  return manifests && manifests[
    manifestId
    || (windowId && (getWindow(state, { windowId }) || {}).manifestId)
  ];
}
