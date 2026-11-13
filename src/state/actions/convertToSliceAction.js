/**
 * Wraps a slice's native action creator so it also accepts the legacy
 * positional-argument call signature, in addition to the single RTK-style
 * payload object. `legacyParamNames` maps each legacy positional argument to
 * a key on the resulting payload object;
 *
 * Example call:
 * convertToSliceAction(updateLayersSliceAction, ['windowId', 'canvasId', 'payload']);
 */
export default function convertToSliceAction(forwardedAction, legacyParamNames) {
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
  };
}
