"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElasticLayout = getElasticLayout;
exports.getLatestError = getLatestError;
exports.isFocused = exports.getWorkspaceType = exports.getFullScreenEnabled = void 0;

var _reselect = require("reselect");

var _getters = require("./getters");

var _utils = require("./utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/** */
function getElasticLayout(state) {
  return (0, _utils.miradorSlice)(state).elasticLayout;
}

var getFullScreenEnabled = (0, _reselect.createSelector)([_getters.getWorkspace], function (workspace) {
  return workspace.isFullscreenEnabled;
});
/** Returns the latest error from the state
 * @param {object} state
 */

exports.getFullScreenEnabled = getFullScreenEnabled;

function getLatestError(state) {
  var _miradorSlice$errors$ = _slicedToArray((0, _utils.miradorSlice)(state).errors.items, 1),
      errorId = _miradorSlice$errors$[0];

  return (0, _utils.miradorSlice)(state).errors[errorId];
}

var getWorkspaceType = (0, _reselect.createSelector)([_getters.getWorkspace], function (_ref) {
  var type = _ref.type;
  return type;
});
exports.getWorkspaceType = getWorkspaceType;
var getFocusedWindowId = (0, _reselect.createSelector)([_getters.getWorkspace], function (_ref2) {
  var focusedWindowId = _ref2.focusedWindowId;
  return focusedWindowId;
});
/** Check if the current window is focused */

var isFocused = function isFocused(state, _ref3) {
  var windowId = _ref3.windowId;
  return getFocusedWindowId(state) === windowId;
};

exports.isFocused = isFocused;