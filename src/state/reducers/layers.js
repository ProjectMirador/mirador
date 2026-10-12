import { unset } from './utils';
import deepmerge from 'deepmerge';
import ActionTypes from '../actions/action-types';

/**
 * configReducer - does a deep merge of the config
 */
export const layersReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_LAYERS:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          [action.canvasId]: deepmerge((state[action.windowId] || {})[action.canvasId] || {}, action.payload),
        },
      };
    case ActionTypes.REMOVE_WINDOW:
      return unset(state, action.windowId);
    default:
      return state;
  }
};
