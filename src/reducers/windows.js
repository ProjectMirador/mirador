import ActionTypes from '../action-types';

/**
 * windowsReducer
 */
const windowsReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_WINDOW:
      return state.concat(Object.assign({}, action.payload));
    case ActionTypes.REMOVE_WINDOW:
      return state.filter(window => window.id !== action.windowId);
    case ActionTypes.NEXT_CANVAS:
      return state.map((window) => {
        if (window.id === action.windowId) {
          return Object.assign({}, window, { canvasIndex: window.canvasIndex + 1 });
        }
        return window;
      });
    case ActionTypes.PREVIOUS_CANVAS:
      return state.map((window) => {
        if (window.id === action.windowId) {
          return Object.assign({}, window, { canvasIndex: window.canvasIndex - 1 });
        }
        return window;
      });
    default:
      return state;
  }
};

export default windowsReducer;
