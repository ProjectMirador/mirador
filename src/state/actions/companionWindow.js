import uuid from 'uuid/v4';
import ActionTypes from './action-types';
import { getCompanionWindowIdsForPosition } from '../selectors';

const defaultProps = {
  content: null,
  position: null,
};

/** */
export function addCompanionWindow(windowId, payload, defaults = defaultProps) {
  return (dispatch, getState) => {
    const { companionWindows } = getState();
    const id = `cw-${uuid()}`;

    dispatch({
      companionWindows,
      id,
      payload: { ...defaults, ...payload, id },
      type: ActionTypes.ADD_COMPANION_WINDOW,
      windowId,
    });
  };
}

/** */
export function addOrUpdateCompanionWindow(windowId, payload, defaults = defaultProps) {
  return (dispatch, getState) => {
    const state = getState();
    const { position } = payload;

    const updatableWindowId = position === 'left' && getCompanionWindowIdsForPosition(state, { position, windowId })[0];

    if (updatableWindowId) {
      dispatch(updateCompanionWindow(windowId, updatableWindowId, payload));
    } else {
      dispatch(addCompanionWindow(windowId, payload, defaults));
    }
  };
}

/** */
export function updateCompanionWindow(windowId, id, payload) {
  return {
    id,
    payload,
    type: ActionTypes.UPDATE_COMPANION_WINDOW,
    windowId,
  };
}

/** */
export function removeCompanionWindow(windowId, id) {
  return {
    id,
    type: ActionTypes.REMOVE_COMPANION_WINDOW,
    windowId,
  };
}
