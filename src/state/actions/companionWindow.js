import uuid from 'uuid/v4';
import ActionTypes from './action-types';

const defaultProps = {
  content: null,
  position: null,
};

/** */
export function addCompanionWindow(payload, defaults = defaultProps) {
  const id = `cw-${uuid()}`;
  return {
    type: ActionTypes.ADD_COMPANION_WINDOW,
    id,
    payload: { ...defaults, ...payload, id },
  };
}

/** */
export function updateCompanionWindow(id, payload) {
  return { type: ActionTypes.UPDATE_COMPANION_WINDOW, id, payload };
}

/** */
export function removeCompanionWindow(id) {
  return { type: ActionTypes.REMOVE_COMPANION_WINDOW, id };
}
