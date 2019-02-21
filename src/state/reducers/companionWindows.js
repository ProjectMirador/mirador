import {
  removeIn, setIn, updateIn, merge,
} from 'immutable';
import ActionTypes from '../actions/action-types';

/** */
export function companionWindowsReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMPANION_WINDOW:
      return setIn(state, [action.id], action.payload);

    case ActionTypes.UPDATE_COMPANION_WINDOW:
      return updateIn(state, [action.id], orig => merge(orig, action.payload));

    case ActionTypes.REMOVE_COMPANION_WINDOW:
      return removeIn(state, [action.id]);

    default:
      return state;
  }
}
