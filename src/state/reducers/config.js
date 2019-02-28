import deepmerge from 'deepmerge';
import ActionTypes from '../actions/action-types';

/**
 * configReducer - does a deep merge of the config
 */
export const configReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CONFIG:
    case ActionTypes.IMPORT_CONFIG:
      return deepmerge(state, action.config);
    case ActionTypes.SET_CONFIG:
      return action.config;
    default:
      return state;
  }
};
