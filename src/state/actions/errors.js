import uuid from 'uuid/v4';
import ActionTypes from './action-types';

/**
 * addError - action creator
 * @param {string} error
 */
export function addError(error) {
  return {
    id: `error-${uuid()}`,
    payload: {
      ...error,
    },
    type: ActionTypes.ADD_ERROR,
  };
}

/**
 * removeError - action creator
 * @param {string} id
 */
export function confirmError(id) {
  return { id, type: ActionTypes.CONFIRM_ERROR };
}
