import without from 'lodash/without';
import ActionTypes from '../actions/action-types';

const defaultState = { items: [] };

/**
 * errorsReducer
 */
export const errorsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ERROR:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          ...action.payload,
        },
        items: [action.id, ...state.items],
      };
    case ActionTypes.CONFIRM_ERROR:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          showDialog: false,
        },
      };
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return defaultState;
    default:
      return state;
  }
};
