import fetch from 'node-fetch';
import ActionTypes from './action-types';
import { addError } from './errors';

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
export function fetchManifest(manifestId, properties, showErrorDialog = false) {
  return ((dispatch) => {
    dispatch(requestManifest(manifestId, { ...properties, isFetching: true }));

    return fetch(manifestId)
      .then(response => response.json())
      .then(json => dispatch(receiveManifest(manifestId, json)))
      .catch((error) => {
        // JSON parse failure returns an error object
        const errorMessage = typeof error === 'object' ? String(error) : error;
        dispatch(receiveManifestFailure(manifestId, errorMessage));
        dispatch(addError({
          message: errorMessage,
          showDialog: showErrorDialog,
        }));
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
