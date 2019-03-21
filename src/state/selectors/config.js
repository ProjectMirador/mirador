import { createSelector } from 'reselect';
/**
* Return languages from config (in state) and indicate which is currently set
* @param {object} state
* @return {Array} [ {locale: 'de', label: 'Deutsch', current: true}, ... ]
*/
export const getLanguagesFromConfigWithCurrent = createSelector(
  [state => state.config],
  ({ availableLanguages, language }) => Object.keys(availableLanguages).map(key => ({
    current: key === language,
    label: availableLanguages[key],
    locale: key,
  })),
);
