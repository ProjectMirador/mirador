import { createSelector } from 'reselect';
import ManifestoCanvas from '../../lib/ManifestoCanvas';
import { getCanvas, getVisibleCanvases } from './canvases';

/**
 * Get the image layers from a canvas
 */
export const getCanvasLayers = createSelector(
  [
    getCanvas,
  ],
  (canvas) => {
    if (!canvas) return [];
    const manifestoCanvas = new ManifestoCanvas(canvas);
    return manifestoCanvas.imageResources;
  },
);

/**
 * Get the layer state for a particular canvas
 */
export const getLayers = createSelector(
  [
    state => state.layers || {},
    (state, { windowId }) => windowId,
    (state, { canvasId }) => canvasId,
  ],
  (layers, windowId, canvasId) => (layers[windowId] || {})[canvasId],
);

/**
 * Returns a list of canvas layers, sorted by the layer state configuration
 */
export const getSortedLayers = createSelector(
  [
    getCanvasLayers,
    getLayers,
  ],
  (canvasLayers, layerConfig) => {
    if (!layerConfig) return canvasLayers;

    const sorted = canvasLayers.sort((a, b) => {
      if (layerConfig[a.id] && layerConfig[a.id].index !== undefined
        && layerConfig[b.id] && layerConfig[b.id].index !== undefined) {
        return layerConfig[a.id].index - layerConfig[b.id].index;
      }

      // sort a layer with index data above layers without
      if (layerConfig[a.id] && layerConfig[a.id].index !== undefined) return -1;
      if (layerConfig[b.id] && layerConfig[b.id].index !== undefined) return 1;

      return 0;
    });

    return sorted;
  },
);

/**
 * Get all the layer configuration for visible canvases
 */
export const getLayersForVisibleCanvases = createSelector(
  [
    getVisibleCanvases,
    (state, { windowId }) => (canvasId => getLayers(state, { canvasId, windowId })),
  ],
  (canvases, getLayersForCanvas) => (
    canvases.reduce((acc, canvas) => {
      acc[canvas.id] = getLayersForCanvas(canvas.id);
      return acc;
    }, {})
  ),
);
