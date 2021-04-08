import { createSelector } from 'reselect';
import { miradorSlice } from './utils';

/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */
export function getWindowManifests(state) {
  return Object.values(miradorSlice(state).windows).map(window => window.manifestId);
}

/** */
export function getWindows(state) {
  return miradorSlice(state).windows || {};
}

/** */
export function getWindow(state, { windowId }) {
  return getWindows(state)[windowId];
}

export const getViewer = createSelector(
  [
    state => miradorSlice(state).viewers,
    (state, { windowId }) => windowId,
  ],
  (viewers, windowId) => viewers[windowId],
);

/** */
export function getWorkspace(state) {
  return miradorSlice(state).workspace;
}

/** */
export const getWindowIds = createSelector(
  [getWorkspace],
  ({ windowIds }) => windowIds || [],
);

/** */
export function getManifests(state) {
  return miradorSlice(state).manifests || {};
}

/** Get the relevant manifest information */
export function getManifest(state, { manifestId, windowId }) {
  const manifests = getManifests(state);
  return manifests && manifests[
    manifestId
    || (windowId && (getWindow(state, { windowId }) || {}).manifestId)
  ];
}

/** */
export function getCatalog(state) {
  return miradorSlice(state).catalog || {};
}
