import { reducer } from 'mirador-mosaic';
import ActionTypes from '../actions/action-types';

/**
 * gridLayoutReducer
 */
export const gridLayoutReducer = (state = { areas: [], columns: [], rows: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_WINDOW:
      return reducer(state, { id: action.window.id, type: 'add' });
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.gridLayout || {};
    default:
      if (!action.type.startsWith('mirador/grid')) return state;
      return reducer(state, { ...action, type: action.type.replace('mirador/grid/', '') });
  }
};
