import uuid from 'uuid/v4';
import ActionTypes from './action-types';

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
      type: ActionTypes.ADD_COMPANION_WINDOW,
      id,
      windowId,
      companionWindows,
      payload: { ...defaults, ...payload, id },
    });
  };
}

/** */
export function updateCompanionWindow(windowId, id, payload) {
  return {
    type: ActionTypes.UPDATE_COMPANION_WINDOW,
    windowId,
    id,
    payload,
  };
}

/** */
export function removeCompanionWindow(windowId, id) {
  return { type: ActionTypes.REMOVE_COMPANION_WINDOW, id, windowId };
}
