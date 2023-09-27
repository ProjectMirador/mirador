import { createSelector } from 'reselect';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { getCanvas, getVisibleCanvasIds } from './canvases';
import { miradorSlice } from './utils';

/**
 * Get the image layers from a canvas.
 * @param {object} state
 * @param {object} props
 * @param {string} props.canvasId
 * @param {string} props.windowId
 * @param {string} props.companionWindowId
 * @returns {Array}
 */
export const getCanvasLayers = createSelector(
  [
    getCanvas,
  ],
  (canvas) => {
    if (!canvas) return [];
    const miradorCanvas = new MiradorCanvas(canvas);
    return miradorCanvas.imageResources;
  },
);

/**
 * Get the layer state for a particular canvas.
 * @param {object} state
 * @param {string} windowId
 * @returns {object}
 */
export const getLayers = createSelector(
  [
    state => miradorSlice(state).layers || {},
    (state, { windowId }) => windowId,
    (state, { canvasId }) => canvasId,
  ],
  (layers, windowId, canvasId) => (layers[windowId] || {})[canvasId],
);

/**
 * Returns a list of canvas layers, sorted by the layer state configuration.
 * @param {object} state
 * @param {object} props
 * @param {string} props.companionWindowId
 * @returns {Array}
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
 * Get all the layer configuration for visible canvases.
 * @param {object} state
 * @param {object} props
 * @param {string} props.windowId
 * @returns {object}
 */
export const getLayersForVisibleCanvases = createSelector(
  [
    getVisibleCanvasIds,
    (state, { windowId }) => (canvasId => getLayers(state, { canvasId, windowId })),
  ],
  (canvasIds, getLayersForCanvas) => (
    canvasIds.reduce((acc, canvasId) => {
      acc[canvasId] = getLayersForCanvas(canvasId);
      return acc;
    }, {})
  ),
);
