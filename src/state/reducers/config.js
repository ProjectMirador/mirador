import deepmerge from 'deepmerge';
import settings from '../../config/settings';
import ActionTypes from '../actions/action-types';

const initialState = { ...settings };

/** Overwrite arrays when deep merging */
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

/**
 * configReducer - does a deep merge of the config
 */
export const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CONFIG:
    case ActionTypes.IMPORT_CONFIG:
      return deepmerge(state, action.config, { arrayMerge: overwriteMerge });
    case ActionTypes.SET_CONFIG:
      return action.config;
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return {
        ...(action.state.config || {}),
        export: deepmerge(state.export || {}, action.state.config?.export || {}, { arrayMerge: overwriteMerge }),
        requests: deepmerge(state.requests || {}, action.state.config?.requests || {}, { arrayMerge: overwriteMerge }),
        theme: deepmerge(state.theme || {}, action.state.config?.theme || {}, { arrayMerge: overwriteMerge }),
        themes: deepmerge(state.themes || {}, action.state.config?.themes || {}, { arrayMerge: overwriteMerge }),
      };
    default:
      return state;
  }
};
