import ActionTypes from '../action-types';

/**
 * windowsReducer
 */
const windowsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_WINDOW:
      return { ...state, [action.window.id]: action.window };
    case ActionTypes.REMOVE_WINDOW:
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.windowId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    case ActionTypes.NEXT_CANVAS:
      return Object.values(state).reduce((object, window) => {
        if (window.id === action.windowId) {
          return {
            ...object,
            [window.id]: { ...window, canvasIndex: window.canvasIndex + 1 },
          };
        }
        return { ...object, [window.id]: window };
      }, {});
    case ActionTypes.PREVIOUS_CANVAS:
      return Object.values(state).reduce((object, window) => {
        if (window.id === action.windowId) {
          return {
            ...object,
            [window.id]: { ...window, canvasIndex: window.canvasIndex - 1 },
          };
        }
        return { ...object, [window.id]: window };
      }, {});
    default:
      return state;
  }
};

export default windowsReducer;
