import { createSelector } from 'reselect';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { getCanvas, getVisibleCanvasIds } from './canvases';
import { miradorSlice } from './utils';
/**
 * Get the image layers from a canvas
 */

export var getCanvasLayers = createSelector([getCanvas], function (canvas) {
  if (!canvas) return [];
  var miradorCanvas = new MiradorCanvas(canvas);
  return miradorCanvas.imageResources;
});
/**
 * Get the layer state for a particular canvas
 */

export var getLayers = createSelector([function (state) {
  return miradorSlice(state).layers || {};
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

export var getSortedLayers = createSelector([getCanvasLayers, getLayers], function (canvasLayers, layerConfig) {
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

export var getLayersForVisibleCanvases = createSelector([getVisibleCanvasIds, function (state, _ref3) {
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