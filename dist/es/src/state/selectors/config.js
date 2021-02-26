function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { createSelector } from 'reselect';
import deepmerge from 'deepmerge';
import { miradorSlice } from './utils';
import { getWorkspace } from './getters';
/** */

export function getConfig(state) {
  var slice = miradorSlice(state || {});
  return slice.config || {};
}
/**
 * Extract an exportable version of state using the configuration from the config.
 */

export function getExportableState(state) {
  var exportConfig = getConfig(state)["export"];
  return Object.entries(exportConfig).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        stem = _ref2[0],
        value = _ref2[1];

    if (value === true) {
      acc[stem] = state[stem];
    } else if (value.filter) {
      acc[stem] = Object.entries(state[stem]).filter(value.filter).reduce(function (stemAcc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        stemAcc[k] = v; // eslint-disable-line no-param-reassign

        return stemAcc;
      }, {});
    }

    return acc;
  }, {});
}
/**
* Return languages from config (in state) and indicate which is currently set
* @param {object} state
* @return {Array} [ {locale: 'de', label: 'Deutsch', current: true}, ... ]
*/

export var getLanguagesFromConfigWithCurrent = createSelector([getConfig], function (_ref5) {
  var availableLanguages = _ref5.availableLanguages,
      language = _ref5.language;
  return Object.keys(availableLanguages).map(function (key) {
    return {
      current: key === language,
      label: availableLanguages[key],
      locale: key
    };
  });
});
export var getShowZoomControlsConfig = createSelector([getWorkspace, getConfig], function (workspace, config) {
  return workspace.showZoomControls === undefined ? config.workspace.showZoomControls : workspace.showZoomControls;
});
export var getTheme = createSelector([getConfig], function (_ref6) {
  var theme = _ref6.theme,
      themes = _ref6.themes,
      selectedTheme = _ref6.selectedTheme;
  return deepmerge(theme, themes[selectedTheme] || {});
});
export var getThemeIds = createSelector([getConfig], function (_ref7) {
  var themes = _ref7.themes;
  return Object.keys(themes);
});
export var getContainerId = createSelector([getConfig], function (_ref8) {
  var id = _ref8.id;
  return id;
});
export var getThemeDirection = createSelector([getConfig], function (_ref9) {
  var theme = _ref9.theme;
  return theme.direction || 'ltr';
});
export var getRequestsConfig = createSelector([getConfig], function (_ref10) {
  var requests = _ref10.requests;
  return requests || {};
});