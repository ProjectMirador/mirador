import fetch from 'node-fetch';
import ActionTypes from './action-types';

/**
 * requestManifest - action creator
 *
 * @param  {String} manifestId
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
 *
 * @param  {String} manifestId
 * @param  {Object} manifestJson
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
 *
 * @param  {String} windowId
 * @param  {String} error
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
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
export function fetchManifest(manifestId, properties) {
  return ((dispatch) => {
    dispatch(requestManifest(manifestId, { ...properties, isFetching: true }));

    return fetch(manifestId)
      .then(response => response.json())
      .then((json) => {
        let collectionId = null;
        if (json['@type'] === 'sc:Collection') {
          collectionId = manifestId;
          manifestId = json.manifests[0]['@id']; // eslint-disable-line no-param-reassign
          dispatch(requestManifest(manifestId, { ...properties, collectionId, isFetching: true }));
        }
        dispatch(receiveManifest(manifestId, json, collectionId));
      })
      .catch((error) => {
        if (typeof error === 'object') { // Returned by JSON parse failure
          dispatch(receiveManifestFailure(manifestId, String(error)));
        } else {
          dispatch(receiveManifestFailure(manifestId, error));
        }
      });
  });
}

/**
 * removeManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
export function removeManifest(manifestId) {
  return { manifestId, type: ActionTypes.REMOVE_MANIFEST };
}
