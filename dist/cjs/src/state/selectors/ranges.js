"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getManuallyExpandedNodeIds = getManuallyExpandedNodeIds;
exports.getExpandedNodeIds = getExpandedNodeIds;
exports.getNodeIdToScrollTo = getNodeIdToScrollTo;
exports.getDefaultSidebarVariant = exports.getVisibleNodeIds = void 0;

var _reselect = require("reselect");

var _union = _interopRequireDefault(require("lodash/union"));

var _without = _interopRequireDefault(require("lodash/without"));

var _Utils = require("manifesto.js/dist-esmodule/Utils");

var _canvases = require("./canvases");

var _companionWindows = require("./companionWindows");

var _sequences = require("./sequences");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/** */
function rangeContainsCanvasId(range, canvasId) {
  var canvasIds = range.getCanvasIds();

  for (var i = 0; i < canvasIds.length; i += 1) {
    if (_Utils.Utils.normalisedUrlsMatch(canvasIds[i], canvasId)) {
      return true;
    }
  }

  return false;
}
/** */


function getAllParentIds(node) {
  if (node.parentNode === undefined) {
    return [];
  }

  if (node.parentNode.parentNode === undefined) {
    return [node.parentNode.id];
  }

  return [].concat(_toConsumableArray(getAllParentIds(node.parentNode)), [node.parentNode.id]);
}
/** */


function getVisibleNodeIdsInSubTree(nodes, canvasIds) {
  return nodes.reduce(function (nodeIdAcc, node) {
    var result = [];
    result.push.apply(result, _toConsumableArray(nodeIdAcc));
    var nodeContainsVisibleCanvas = canvasIds.reduce(function (acc, canvasId) {
      return acc || rangeContainsCanvasId(node.data, canvasId);
    }, false);
    var subTreeVisibleNodeIds = node.nodes.length > 0 ? getVisibleNodeIdsInSubTree(node.nodes, canvasIds) : [];
    result.push.apply(result, _toConsumableArray(subTreeVisibleNodeIds));

    if (nodeContainsVisibleCanvas || subTreeVisibleNodeIds.length > 0) {
      result.push({
        containsVisibleCanvas: nodeContainsVisibleCanvas,
        descendantsContainVisibleCanvas: subTreeVisibleNodeIds.length > 0,
        id: node.id,
        leaf: node.nodes.length === 0,
        parentIds: getAllParentIds(node)
      });
    }

    return result;
  }, []);
}
/** */


var getVisibleLeafAndBranchNodeIds = (0, _reselect.createSelector)([_sequences.getSequenceTreeStructure, _canvases.getVisibleCanvasIds], function (tree, canvasIds) {
  if (canvasIds.length === 0 || !tree) return [];
  return getVisibleNodeIdsInSubTree(tree.nodes, canvasIds);
});
/** */

var getVisibleNodeIds = (0, _reselect.createSelector)([getVisibleLeafAndBranchNodeIds], function (visibleLeafAndBranchNodeIds) {
  return visibleLeafAndBranchNodeIds.map(function (item) {
    return item.id;
  });
});
exports.getVisibleNodeIds = getVisibleNodeIds;
var getVisibleBranchNodeIds = (0, _reselect.createSelector)([getVisibleLeafAndBranchNodeIds], function (visibleLeafAndBranchNodeIds) {
  return visibleLeafAndBranchNodeIds.reduce(function (acc, item) {
    return item.leaf || !item.descendantsContainVisibleCanvas ? acc : [].concat(_toConsumableArray(acc), [item.id]);
  }, []);
});
var getCanvasContainingNodeIds = (0, _reselect.createSelector)([getVisibleLeafAndBranchNodeIds], function (visibleLeafAndBranchNodeIds) {
  return visibleLeafAndBranchNodeIds.reduce(function (acc, item) {
    return item.containsVisibleCanvas ? [].concat(_toConsumableArray(acc), [item]) : acc;
  }, []);
});
/** */

function getManuallyExpandedNodeIds(state, _ref, expanded) {
  var companionWindowId = _ref.companionWindowId;
  var companionWindow = (0, _companionWindows.getCompanionWindow)(state, {
    companionWindowId: companionWindowId
  });
  return companionWindow.tocNodes ? Object.keys(companionWindow.tocNodes).reduce(function (acc, nodeId) {
    return companionWindow.tocNodes[nodeId].expanded === expanded ? [].concat(_toConsumableArray(acc), [nodeId]) : acc;
  }, []) : [];
}
/** */


function getExpandedNodeIds(state, _ref2) {
  var companionWindowId = _ref2.companionWindowId,
      windowId = _ref2.windowId;
  var visibleBranchNodeIds = getVisibleBranchNodeIds(state, {
    companionWindowId: companionWindowId,
    windowId: windowId
  });
  var manuallyExpandedNodeIds = getManuallyExpandedNodeIds(state, {
    companionWindowId: companionWindowId
  }, true);
  var manuallyClosedNodeIds = getManuallyExpandedNodeIds(state, {
    companionWindowId: companionWindowId
  }, false);
  return _without["default"].apply(void 0, [(0, _union["default"])(manuallyExpandedNodeIds, visibleBranchNodeIds)].concat(_toConsumableArray(manuallyClosedNodeIds)));
}
/** */


function getNodeIdToScrollTo(state, _ref3) {
  var args = _extends({}, _ref3);

  var canvasContainingNodeIds = getCanvasContainingNodeIds(state, _objectSpread({}, args));
  var collapsedNodeIds = getManuallyExpandedNodeIds(state, args, false);

  if (canvasContainingNodeIds && canvasContainingNodeIds.length > 0) {
    for (var i = 0; i < canvasContainingNodeIds[0].parentIds.length; i += 1) {
      if (collapsedNodeIds.indexOf(canvasContainingNodeIds[0].parentIds[i]) !== -1) {
        return canvasContainingNodeIds[0].parentIds[i];
      }
    }

    return canvasContainingNodeIds[0].id;
  }

  return null;
}
/**
 * Returns the default sidebar variant depending on whether or not ranges exist
 */


var getDefaultSidebarVariant = (0, _reselect.createSelector)([_sequences.getSequenceTreeStructure], function (tree) {
  return tree && tree.nodes && tree.nodes.length > 0 ? 'tableOfContents' : 'item';
});
exports.getDefaultSidebarVariant = getDefaultSidebarVariant;