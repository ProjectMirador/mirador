import { createSelector } from 'reselect';

/** */
function getWorkspace(state) {
  return state.workspace;
}

export const getFullScreenEnabled = createSelector(
  [getWorkspace],
  workspace => workspace.isFullscreenEnabled,
);
