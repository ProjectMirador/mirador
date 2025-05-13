import ActionTypes from './action-types';

/**
 * updateLayers - action creator
 * @param {string} windowId
 * @param {string} canvasId
 * @param {object|string} payload
 */
export function updateLayers(windowId, canvasId, payload) {
  return {
    canvasId,
    payload,
    type: ActionTypes.UPDATE_LAYERS,
    windowId,
  };
}
