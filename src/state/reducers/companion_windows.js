import ActionTypes from '../actions/action-types';

/**
 * getCompanionWindowForPosition - Finds the companion window with the given windowId and position
 * This will not be necessary once we have multiple companion windows in a single position and
 * we can convert this and SET_COMPANION_WINDOW into a simple ADD_COMPANION_WINDOW reducer
 */
function getCompanionWindowForPosition(state, windowId, position) {
  return Object.values(state).find(cw => (
    cw.windowId === windowId && cw.position === position
  ));
}

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
        state, action.windowId, action.position,
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
