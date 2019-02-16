import ActionTypes from '../actions/action-types';
import { getCompanionWindowForPosition } from '../selectors';

/**
 * companionWindowsReducer
 */
export const companionWindowsReducer = (state = {}, action) => {
  switch (action.type) {
    // action params: id
    case ActionTypes.REMOVE_COMPANION_WINDOW:
      return Object.keys(state).reduce((object, key) => {
        if (state[key].id !== action.id) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    // action params: id, windowId, position, content
    case ActionTypes.SET_COMPANION_WINDOW: {
      const companionWindowForPosition = getCompanionWindowForPosition(
        { companionWindows: state }, action.windowId, action.position,
      );
      let cwId;
      let cwObject;

      if (companionWindowForPosition) {
        cwId = companionWindowForPosition.id;
        cwObject = {
          ...companionWindowForPosition,
          position: action.position,
          content: action.content,
        };
      } else {
        cwId = action.id;
        cwObject = {
          id: cwId, windowId: action.windowId, position: action.position, content: action.content,
        };
      }

      return { ...state, [cwId]: cwObject };
    }


    // action params: windowId
    case ActionTypes.REMOVE_WINDOW:
      return Object.keys(state).reduce((object, key) => {
        if (state[key].windowId !== action.windowId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    default:
      return state;
  }
};
