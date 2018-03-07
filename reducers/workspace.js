import ActionTypes from '../action-types';

const workspaceReducer = (state = {}, action) => {
  console.log('Reducing', action.type);

  switch (action.type) {
  case ActionTypes.FOCUS_WINDOW:
    return Object.assign({}, state, {focusedWindowId: action.windowId});
  case ActionTypes.REQUEST_MANIFEST:
    return Object.assign({}, state, {});
  case ActionTypes.RECEIVE_MANIFEST:
    return Object.assign({}, state, {});
  default:
    return state;
  }
};

export { workspaceReducer as default };
