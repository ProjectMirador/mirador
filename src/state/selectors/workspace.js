import { createSelector } from 'reselect';

/** */
function getWorkspace(state) {
  return state.workspace;
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
