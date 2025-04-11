import ActionTypes from './action-types';

/**
 * requestManifest - action creator
 * @param  {string} manifestId
 * @memberof ActionCreators
 */
export function requestManifest(manifestId, properties) {
  return {
    manifestId,
    properties,
    type: ActionTypes.REQUEST_MANIFEST,
  };
}

/**
 * receiveManifest - action creator
 * @param  {string} manifestId
 * @param  {object} manifestJson
 * @memberof ActionCreators
 */
export function receiveManifest(manifestId, manifestJson) {
  return {
    manifestId,
    manifestJson,
    type: ActionTypes.RECEIVE_MANIFEST,
  };
}

/**
 * receiveManifestFailure - action creator
 * @param  {string} manifestId
 * @param  {string} error
 * @memberof ActionCreators
 */
export function receiveManifestFailure(manifestId, error) {
  return {
    error,
    manifestId,
    type: ActionTypes.RECEIVE_MANIFEST_FAILURE,
  };
}

/**
 * fetchManifest - action creator
 * @param  {string} manifestId
 * @memberof ActionCreators
 */
export function fetchManifest(manifestId, properties) {
  return requestManifest(manifestId, { ...properties, isFetching: true });
}

/**
 * removeManifest - action creator
 * @param  {string} manifestId
 * @memberof ActionCreators
 */
export function removeManifest(manifestId) {
  return { manifestId, type: ActionTypes.REMOVE_MANIFEST };
}
