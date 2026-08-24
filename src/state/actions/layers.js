import { updateLayers as updateLayersSliceAction } from '../slices';

function convertToSliceAction(forwardedAction, legacyParamNames) {
  return (...args) => {
    if (args.length === 1 && typeof args[0] === 'object') {
      return forwardedAction(args[0]);
    }

    let payload = {};

    legacyParamNames.forEach((paramName, index) => {
      if (paramName === 'payload') {
        payload = { ...payload, ...args[index] };
      } else {
        payload[paramName] = args[index];
      }
    });

    return forwardedAction(payload);
  }
}

export const updateLayers = convertToSliceAction(updateLayersSliceAction, ['windowId', 'canvasId', 'payload']);
