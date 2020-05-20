import ActionTypes from './action-types';
import { fetchManifest } from './manifest';

/**
 * add a manifest to the resource catalog
 * @param {string} manifestId
 */
export function addResource(manifestId) {
  return ((dispatch, getState) => {
    dispatch({ manifestId, type: ActionTypes.ADD_RESOURCE });
    dispatch(fetchManifest(manifestId));
  });
}

/** remove a manifest from the resource catalog */
export function removeResource(manifestId) {
  return {
    manifestId,
    type: ActionTypes.REMOVE_RESOURCE,
  };
}
