"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWindowTitles = getWindowTitles;
exports.getWindowDraggability = exports.getAllowedWindowViewTypes = exports.getWindowViewType = exports.getMaximizedWindowsIds = exports.getWindowConfig = void 0;

var _reselect = require("reselect");

var _manifests = require("./manifests");

var _config = require("./config");

var _getters = require("./getters");

var _workspace = require("./workspace");

var _sequences = require("./sequences");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** */
var getWindowConfig = (0, _reselect.createSelector)([_config.getConfig, _getters.getWindow], function (_ref) {
  var defaultConfig = _ref.window;
  var windowConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread(_objectSpread({}, defaultConfig), windowConfig);
});
/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */

exports.getWindowConfig = getWindowConfig;

function getWindowTitles(state) {
  var result = {};
  Object.keys((0, _getters.getWindows)(state)).forEach(function (windowId) {
    result[windowId] = (0, _manifests.getManifestTitle)(state, {
      windowId: windowId
    });
  });
  return result;
}
/** */


var getMaximizedWindowsIds = (0, _reselect.createSelector)([_getters.getWindows], function (windows) {
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

exports.getMaximizedWindowsIds = getMaximizedWindowsIds;
var getWindowViewType = (0, _reselect.createSelector)([_getters.getWindow, getWindowConfig, _sequences.getSequenceViewingHint, _sequences.getSequenceBehaviors], function (window, _ref2, manifestViewingHint, manifestBehaviors) {
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

exports.getWindowViewType = getWindowViewType;
var getAllowedWindowViewTypes = (0, _reselect.createSelector)([_sequences.getSequenceViewingHint, _sequences.getSequenceBehaviors, getWindowConfig], function (manifestViewingHint, manifestBehaviors, _ref3) {
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

exports.getAllowedWindowViewTypes = getAllowedWindowViewTypes;
var getWindowDraggability = (0, _reselect.createSelector)([_workspace.getWorkspaceType, _getters.getWindow, function (state) {
  return (0, _getters.getWindowIds)(state).length > 1;
}], function (workspaceType, window, manyWindows) {
  if (workspaceType === 'elastic') return true;
  return manyWindows && window && window.maximized === false;
});
exports.getWindowDraggability = getWindowDraggability;