import uuid from 'uuid/v4';
import ActionTypes from './action-types';

/**
 * addError - action creator
 * @param {string} error
 */
export function addError(error) {
  return { type: ActionTypes.ADD_ERROR, id: `error-${uuid()}`, message: error };
}

/**
 * removeError - action creator
 * @param {string} id
 */
export function removeError(id) {
  return { type: ActionTypes.REMOVE_ERROR, id };
}
