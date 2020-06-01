import { updateIn, merge, removeIn } from 'immutable';
import ActionTypes from '../actions/action-types';

/**
 * elasticLayoutReducer
 */
export const elasticLayoutReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_WINDOW:
      return {
        ...state,
        [action.window.id]: {
          windowId: action.window.id, ...action.elasticLayout,
        },
      };

    case ActionTypes.UPDATE_ELASTIC_WINDOW_LAYOUT:
      return updateIn(state, [action.windowId], orig => merge(orig, action.payload));

    case ActionTypes.REMOVE_WINDOW:
      return removeIn(state, [action.windowId]);
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.elasticLayout || {};
    default:
      return state;
  }
};
