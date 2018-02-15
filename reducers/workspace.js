import ActionTypes from '../action-types';

export const workspaceReducer = (state = {}, action) => {
  console.log('Reducing', action.type);

  switch (action.type) {
    case ActionTypes.FOCUS_WINDOW:
      return Object.assign({}, state, {focusedWindowId: action.windowId});
    default:
      return state;
  }
};