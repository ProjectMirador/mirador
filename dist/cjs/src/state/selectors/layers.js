"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLayersForVisibleCanvases = exports.getSortedLayers = exports.getLayers = exports.getCanvasLayers = void 0;

var _reselect = require("reselect");

var _MiradorCanvas = _interopRequireDefault(require("../../lib/MiradorCanvas"));

var _canvases = require("./canvases");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get the image layers from a canvas
 */
var getCanvasLayers = (0, _reselect.createSelector)([_canvases.getCanvas], function (canvas) {
  if (!canvas) return [];
  var miradorCanvas = new _MiradorCanvas["default"](canvas);
  return miradorCanvas.imageResources;
});
/**
 * Get the layer state for a particular canvas
 */

exports.getCanvasLayers = getCanvasLayers;
var getLayers = (0, _reselect.createSelector)([function (state) {
  return (0, _utils.miradorSlice)(state).layers || {};
}, function (state, _ref) {
  var windowId = _ref.windowId;
  return windowId;
}, function (state, _ref2) {
  var canvasId = _ref2.canvasId;
  return canvasId;
}], function (layers, windowId, canvasId) {
  return (layers[windowId] || {})[canvasId];
});
/**
 * Returns a list of canvas layers, sorted by the layer state configuration
 */

exports.getLayers = getLayers;
var getSortedLayers = (0, _reselect.createSelector)([getCanvasLayers, getLayers], function (canvasLayers, layerConfig) {
  if (!layerConfig) return canvasLayers;
  var sorted = canvasLayers.sort(function (a, b) {
    if (layerConfig[a.id] && layerConfig[a.id].index !== undefined && layerConfig[b.id] && layerConfig[b.id].index !== undefined) {
      return layerConfig[a.id].index - layerConfig[b.id].index;
    } // sort a layer with index data above layers without


    if (layerConfig[a.id] && layerConfig[a.id].index !== undefined) return -1;
    if (layerConfig[b.id] && layerConfig[b.id].index !== undefined) return 1;
    return 0;
  });
  return sorted;
});
/**
 * Get all the layer configuration for visible canvases
 */

exports.getSortedLayers = getSortedLayers;
var getLayersForVisibleCanvases = (0, _reselect.createSelector)([_canvases.getVisibleCanvasIds, function (state, _ref3) {
  var windowId = _ref3.windowId;
  return function (canvasId) {
    return getLayers(state, {
      canvasId: canvasId,
      windowId: windowId
    });
  };
}], function (canvasIds, getLayersForCanvas) {
  return canvasIds.reduce(function (acc, canvasId) {
    acc[canvasId] = getLayersForCanvas(canvasId);
    return acc;
  }, {});
});
exports.getLayersForVisibleCanvases = getLayersForVisibleCanvases;