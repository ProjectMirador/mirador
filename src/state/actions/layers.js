import { updateLayers as updateLayersSliceAction } from '../slices';

export function updateLayers(windowIdOrPayload, canvasId, payload) {
  if (typeof windowIdOrPayload === 'string') {
    return updateLayersSliceAction({ windowId: windowIdOrPayload, canvasId, ...payload });
  }

  return updateLayersSliceAction(windowIdOrPayload);
}
