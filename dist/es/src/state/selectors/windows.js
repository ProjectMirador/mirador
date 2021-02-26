function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createSelector } from 'reselect';
import { getManifestTitle } from './manifests';
import { getConfig } from './config';
import { getWindows, getWindow, getWindowIds } from './getters';
import { getWorkspaceType } from './workspace';
import { getSequenceViewingHint, getSequenceBehaviors } from './sequences';
/** */

export var getWindowConfig = createSelector([getConfig, getWindow], function (_ref) {
  var defaultConfig = _ref.window;
  var windowConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread(_objectSpread({}, defaultConfig), windowConfig);
});
/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */

export function getWindowTitles(state) {
  var result = {};
  Object.keys(getWindows(state)).forEach(function (windowId) {
    result[windowId] = getManifestTitle(state, {
      windowId: windowId
    });
  });
  return result;
}
/** */

export var getMaximizedWindowsIds = createSelector([getWindows], function (windows) {
  return Object.values(windows).filter(function (window) {
    return window.maximized === true;
  }).map(function (window) {
    return window.id;
  });
});
/** Return type of view in a certain window.
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {String}
*/

export var getWindowViewType = createSelector([getWindow, getWindowConfig, getSequenceViewingHint, getSequenceBehaviors], function (window, _ref2, manifestViewingHint, manifestBehaviors) {
  var _ref2$views = _ref2.views,
      views = _ref2$views === void 0 ? [] : _ref2$views,
      defaultView = _ref2.defaultView;
  if (window && window.view) return window.view;
  var config = (views || []).find(function (view) {
    return view.behaviors && view.behaviors.some(function (b) {
      return manifestViewingHint === b || manifestBehaviors.includes(b);
    });
  });
  return config && config.key || defaultView;
});
/** */

export var getAllowedWindowViewTypes = createSelector([getSequenceViewingHint, getSequenceBehaviors, getWindowConfig], function (manifestViewingHint, manifestBehaviors, _ref3) {
  var _ref3$views = _ref3.views,
      views = _ref3$views === void 0 ? [] : _ref3$views,
      defaultView = _ref3.defaultView;
  return (views || []).reduce(function (allowedViews, view) {
    if (view.key === defaultView || !view.behaviors || view.behaviors.some(function (b) {
      return manifestViewingHint === b || manifestBehaviors.includes(b);
    })) allowedViews.push(view.key);
    return allowedViews;
  }, []);
});
/**
 * Returns the draggability of a window
 * @param {object} state
 * @param {object} props
 * @return {Boolean}
 */

export var getWindowDraggability = createSelector([getWorkspaceType, getWindow, function (state) {
  return getWindowIds(state).length > 1;
}], function (workspaceType, window, manyWindows) {
  if (workspaceType === 'elastic') return true;
  return manyWindows && window && window.maximized === false;
});