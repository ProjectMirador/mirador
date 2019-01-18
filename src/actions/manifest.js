import ActionTypes from '../action-types';

/**
 * requestManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
export function requestManifest(manifestId) {
  return {
    type: ActionTypes.REQUEST_MANIFEST,
    manifestId,
  };
}

/**
 * receiveManifest - action creator
 *
 * @param  {String} windowId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */
export function receiveManifest(manifestId, manifestJson) {
  return {
    type: ActionTypes.RECEIVE_MANIFEST,
    manifestId,
    manifestJson,
  };
}

/**
 * receiveManifestFailure - action creator
 *
 * @param  {String} windowId
 * @param  {String} error
 * @memberof ActionCreators
 */
export function receiveManifestFailure(manifestId, error) {
  return {
    type: ActionTypes.RECEIVE_MANIFEST_FAILURE,
    manifestId,
    error,
  };
}

/**
 * fetchManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
export function fetchManifest(manifestId) {
  return {
    type: ActionTypes.FETCH_MANIFEST,
    manifestId,
  };
}

/**
 * removeManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
export function removeManifest(manifestId) {
  return { type: ActionTypes.REMOVE_MANIFEST, manifestId };
}
