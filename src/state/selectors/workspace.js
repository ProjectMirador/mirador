import { createSelector } from 'reselect';

/** */
export function getWorkspace(state) {
  return state.workspace;
}

/** */
export function getElasticLayout(state) {
  return state.elasticLayout;
}

export const getFullScreenEnabled = createSelector(
  [getWorkspace],
  workspace => workspace.isFullscreenEnabled,
);

/** Returns the latest error from the state
 * @param {object} state
 */
export function getLatestError(state) {
  return state.errors.items[0] && state.errors[state.errors.items[0]];
}

export const getWorkspaceType = createSelector(
  [getWorkspace],
  ({ type }) => type,
);
