import ActionTypes from '../actions/action-types';

/**
 * windowsReducer
 */
export const windowsReducer = (state = {}, action) => {
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
    case ActionTypes.SET_WINDOW_VIEW_TYPE:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          view: action.viewType,
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
    case ActionTypes.SET_WINDOW_COMPANION_WINDOW:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          companionWindows: {
            ...state[action.windowId].companionWindows,
            [action.position]: action.panelType,
          },
        },
      };
    case ActionTypes.UPDATE_WINDOW_POSITION:
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          x: action.payload.position.x,
          y: action.payload.position.y,
        },
      };
    case ActionTypes.SET_WINDOW_SIZE:
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          width: action.payload.size.width,
          height: action.payload.size.height,
          x: action.payload.size.x,
          y: action.payload.size.y,
        },
      };
    case ActionTypes.NEXT_CANVAS:
      return setCanvasIndex(state, action.windowId, currentIndex => currentIndex + 1);
    case ActionTypes.PREVIOUS_CANVAS:
      return setCanvasIndex(state, action.windowId, currentIndex => currentIndex - 1);
    case ActionTypes.SET_CANVAS:
      return setCanvasIndex(state, action.windowId, currentIndex => action.canvasIndex);
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
