import {
  removeIn, setIn, updateIn, merge,
} from 'immutable';
import ActionTypes from '../actions/action-types';

/** */
export function companionWindowsReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMPANION_WINDOW:
      return setIn(state, [action.id], action.payload);

    case ActionTypes.ADD_WINDOW:
      return {
        ...state,
        ...((action.companionWindows || []).reduce((newState, cw) => {
          newState[cw.id] = { // eslint-disable-line no-param-reassign
            ...state[cw.id],
            ...cw,
            windowId: action.id,
          };
          return newState;
        }, {})),
      };

    case ActionTypes.REMOVE_WINDOW:
      return Object.keys(state).reduce((object, key) => {
        if (state[key].windowId !== action.windowId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    case ActionTypes.UPDATE_COMPANION_WINDOW:
      return updateIn(state, [action.id], orig => merge(orig, action.payload));

    case ActionTypes.REMOVE_COMPANION_WINDOW:
      return removeIn(state, [action.id]);
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.companionWindows || [];
    case ActionTypes.TOGGLE_TOC_NODE:
      return updateIn(state, [[action.id], 'tocNodes'], {}, orig => merge(orig, action.payload));
    default:
      return state;
  }
}
