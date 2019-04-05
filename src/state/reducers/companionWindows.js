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
      return action.companionWindows.reduce((newState, cw) => {
        newState[cw.id] = cw; // eslint-disable-line no-param-reassign
        return newState;
      }, state);

    case ActionTypes.REMOVE_WINDOW:
      return action.companionWindowIds.reduce((newState, id) => removeIn(newState, [id]), state);

    case ActionTypes.UPDATE_COMPANION_WINDOW:
      return updateIn(state, [action.id], orig => merge(orig, action.payload));

    case ActionTypes.REMOVE_COMPANION_WINDOW:
      return removeIn(state, [action.id]);
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.companionWindows;
    default:
      return state;
  }
}
