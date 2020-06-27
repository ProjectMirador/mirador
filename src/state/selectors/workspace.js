import { createSelector } from 'reselect';
import { getWorkspace } from './getters';
import { miradorSlice } from './utils';

/** */
export function getElasticLayout(state) {
  return miradorSlice(state).elasticLayout;
}

export const getFullScreenEnabled = createSelector(
  [getWorkspace],
  workspace => workspace.isFullscreenEnabled,
);

/** Returns the latest error from the state
 * @param {object} state
 */
export function getLatestError(state) {
  const [errorId] = miradorSlice(state).errors.items;

  return miradorSlice(state).errors[errorId];
}

export const getWorkspaceType = createSelector(
  [getWorkspace],
  ({ type }) => type,
);

const getFocusedWindowId = createSelector(
  [getWorkspace],
  ({ focusedWindowId }) => focusedWindowId,
);

/** Check if the current window is focused */
export const isFocused = (state, { windowId }) => (
  getFocusedWindowId(state) === windowId
);
