import ActionTypes from '../actions/action-types';

/**
 * RangesReducer
 */
export const rangesReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_RANGE: {
      const { windowId, rangeId } = action.payload;
      const rangePresent = state[windowId] && state[windowId][rangeId];

      return {
        ...state,
        [windowId]: {
          ...state[windowId],
          [rangeId]: {
            ...state[rangeId],
            expanded: rangePresent ? !state[windowId][rangeId].expanded : true,
          },
        },
      };
    }
    default:
      return state;
  }
};
