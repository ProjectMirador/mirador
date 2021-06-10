import ActionTypes from './action-types';
/**
 * add a manifest to the resource catalog
 * @param {string} manifestId
 */

export function addResource(manifestId) {
  var manifestJson = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var payload = arguments.length > 2 ? arguments[2] : undefined;
  return {
    manifestId: manifestId,
    manifestJson: manifestJson,
    payload: payload,
    type: ActionTypes.ADD_RESOURCE
  };
}
/** remove a manifest from the resource catalog */

export function removeResource(manifestId) {
  return {
    manifestId: manifestId,
    type: ActionTypes.REMOVE_RESOURCE
  };
}