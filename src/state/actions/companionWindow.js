import uuid from 'uuid/v4';
import ActionTypes from './action-types';
import { updateWindow, setWindowSideBarPanel } from './window';

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
export function updateCompanionWindow(windowId, id, payload) {
  return (dispatch, getState) => {
    if (payload.position) {
      const { windows, companionWindows } = getState();
      const { companionWindowIds } = windows[windowId];

      companionWindowIds
        .filter(cwid => companionWindows[cwid].position === payload.position)
        .map(cwid => closeCompanionWindow(windowId, cwid)(dispatch, getState));
    }

    dispatch({ type: ActionTypes.UPDATE_COMPANION_WINDOW, id, payload });
  };
}

/** */
export function removeCompanionWindow(id) {
  return { type: ActionTypes.REMOVE_COMPANION_WINDOW, id };
}

/**
* Close companion window and remove reference from window
*/
export function closeCompanionWindow(windowId, companionWindowId) {
  return (dispatch, getState) => {
    dispatch(removeCompanionWindow(companionWindowId));
    const companionWindowIds = getState().windows[windowId].companionWindowIds
      .filter(id => id !== companionWindowId);
    dispatch(updateWindow(windowId, { companionWindowIds }));
  };
}

/**
 * popOutCompanionWindow - action creator
 *
 * @param  {String} windowId
 * @param  {String} panelType The type of panel content to be rendered
 *                            in the companion window (e.g. info, canvas_navigation)
 * @param  {String} position The position of the companion window to
 *                           set content for (e.g. right, bottom)
 * @memberof ActionCreators
 */
export function popOutCompanionWindow(windowId, panelType, position) {
  return (dispatch, getState) => {
    const { windows, companionWindows } = getState();
    const { companionWindowIds } = windows[windowId];

    companionWindowIds
      .filter(id => companionWindows[id].position === position)
      .map(id => dispatch(removeCompanionWindow(id)));

    if (position === 'left') {
      dispatch(setWindowSideBarPanel(windowId, panelType));
    }

    const action = dispatch(addCompanionWindow({ content: panelType, position }));

    const companionWindowId = action.id;
    const existingCompanionWindowIds = companionWindowIds
      .filter(id => (companionWindows[id].position !== position));

    dispatch(updateWindow(windowId, {
      companionWindowIds: existingCompanionWindowIds.concat([companionWindowId]),
    }));
  };
}
