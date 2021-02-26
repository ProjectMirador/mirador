import ActionTypes from './action-types';
/**
 * updateLayers - action creator
 * @param {string} id
 */

export function updateLayers(windowId, canvasId, payload) {
  return {
    canvasId: canvasId,
    payload: payload,
    type: ActionTypes.UPDATE_LAYERS,
    windowId: windowId
  };
}