import { createSelector } from 'reselect';
import deepmerge from 'deepmerge';

/** */
function getConfig(state) {
  return state.config || {};
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
  [
    state => state.workspace,
    getConfig,
  ],
  (workspace, config) => (
    workspace.showZoomControls === undefined
      ? (config.workspace.showZoomControls)
      : workspace.showZoomControls
  ),
);

export const getTheme = createSelector(
  [getConfig],
  ({ theme, themes, selectedTheme }) => deepmerge(theme, themes[selectedTheme] || {}),
);

export const getThemeIds = createSelector(
  [getConfig],
  ({ themes }) => Object.keys(themes),
);

export const getContainerId = createSelector(
  [getConfig],
  ({ id }) => id,
);

export const getDefaultView = createSelector(
  [getConfig],
  ({ window }) => window && window.defaultView,
);
