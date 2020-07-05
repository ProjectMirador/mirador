import update from 'lodash/fp/update';
import omit from 'lodash/omit';
import merge from 'lodash/fp/merge';
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
      return update([action.windowId], orig => merge(orig, action.payload), state);

    case ActionTypes.REMOVE_WINDOW:
      return omit(state, action.windowId);
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.elasticLayout || {};
    default:
      return state;
  }
};
