import { createSelector } from 'reselect';
import deepmerge from 'deepmerge';
import { miradorSlice } from './utils';
import { getWorkspace } from './getters';

/** */
export function getConfig(state) {
  const slice = miradorSlice(state || {});
  return slice.config || {};
}

/**
 * Extract an exportable version of state using the configuration from the config.
 */
export function getExportableState(state) {
  const exportConfig = getConfig(state).export;

  return Object.entries(exportConfig).reduce(
    (acc, [stem, value]) => {
      if (value === true) {
        acc[stem] = state[stem];
      } else if (value.filter) {
        acc[stem] = Object.entries(state[stem])
          .filter(value.filter)
          .reduce(
            (stemAcc, [k, v]) => {
              stemAcc[k] = v; // eslint-disable-line no-param-reassign
              return stemAcc;
            },
            {},
          );
      }
      return acc;
    },
    {},
  );
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

/**
 * Return all languages accepted by the user, with the explicitely configured language
 * from `config.langauge` in the first position. The remaining languages are based on
 * the user's browser settings and are used to pick the next-best language in case the
 * there is no value for the primary language in a given IIIF Property Value.
 *
 * @param {object} state
 * @returns all languages understood by the user in descending order of preference
 */
export const getUserLanguages = createSelector(
  [getConfig],
  (config) => config.userLanguages ?? [config.language].filter(l => l !== undefined),
);

export const getShowZoomControlsConfig = createSelector(
  [
    getWorkspace,
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

export const getThemeDirection = createSelector(
  [getConfig],
  ({ theme }) => theme.direction || 'ltr',
);

export const getRequestsConfig = createSelector(
  [getConfig],
  ({ requests }) => requests || {},
);
