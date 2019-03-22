import { createSelector } from 'reselect';

/** */
function getConfig(state) {
  return state.config;
}

/**
* Return languages from config (in state) and indicate which is currently set
* @param {object} state
* @return {Array} [ {locale: 'de', label: 'Deutsch', current: true}, ... ]
*/
export const getLanguagesFromConfigWithCurrent = createSelector(
  [getConfig],
  ({ availableLanguages, language }) => Object.keys(availableLanguages).map(key => ({
    current: key === language,
    label: availableLanguages[key],
    locale: key,
  })),
);

export const getShowZoomControlsConfig = createSelector(
  [state => state.workspace],
  workspace => workspace.showZoomControls,
);

export const getTheme = createSelector(
  [getConfig],
  ({ theme }) => theme,
);

export const getWorkspaceType = createSelector(
  [getConfig],
  ({ workspace }) => workspace.type,
);

export const getFullScreenEnabled = createSelector(
  [getConfig],
  ({ workspace }) => workspace.isFullscreenEnabled,
);

export const getContainerId = createSelector(
  [getConfig],
  ({ id }) => id,
);
