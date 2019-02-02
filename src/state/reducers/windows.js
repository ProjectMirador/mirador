import ActionTypes from '../actions/action-types';

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
    case ActionTypes.TOGGLE_WINDOW_SIDE_BAR:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          sideBarOpen: !state[action.windowId].sideBarOpen,
        },
      };

    case ActionTypes.SET_WINDOW_THUMBNAIL_POSITION:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          thumbnailNavigationPosition: action.position,
        },
      };
    case ActionTypes.TOGGLE_WINDOW_SIDE_BAR_PANEL:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          sideBarPanel: (
            state[action.windowId].sideBarPanel === action.panelType
              ? 'closed'
              : action.panelType
          ),
        },
      };
    case ActionTypes.NEXT_CANVAS:
      return setCanvasIndex(state, action.windowId, currentIndex => currentIndex + 1);
    case ActionTypes.PREVIOUS_CANVAS:
      return setCanvasIndex(state, action.windowId, currentIndex => currentIndex - 1);
    case ActionTypes.SET_CANVAS:
      return setCanvasIndex(state, action.windowId, currentIndex => action.canvasIndex);
    case ActionTypes.UPDATE_VIEWPORT:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          viewer: action.payload,
        },
      };
    default:
      return state;
  }
};

/**
 * @param {Object} state
 * @param {String} windowId
 * @param {Function} getIndex - gets curent canvas index passed and should return new index
*/
function setCanvasIndex(state, windowId, getIndex) {
  return Object.values(state).reduce((object, window) => {
    if (window.id === windowId) {
      return {
        ...object,
        [window.id]: {
          ...window,
          canvasIndex: getIndex(window.canvasIndex),
        },
      };
    }
    return { ...object, [window.id]: window };
  }, {});
}

export default windowsReducer;
