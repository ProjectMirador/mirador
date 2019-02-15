import ActionTypes from '../actions/action-types';

/**
 * viewersReducer
 */
export const viewersReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_VIEWPORT:
      return {
        ...state,
        [action.windowId]: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
