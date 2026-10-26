import { createSlice } from '@reduxjs/toolkit';
import deepmerge from 'deepmerge';
import ActionTypes from '../actions/action-types';

const elasticWindowLayoutSlice = createSlice({
  name: 'elasticWindowLayout',
  initialState: {},
  reducers: {
    updateElasticWindowLayout: {
      reducer(state, action) {
        const { windowId, ...payload } = action.payload || {};
        state[windowId] = deepmerge(state[windowId] || {}, payload);
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ActionTypes.REMOVE_WINDOW, (state, action) => {
        // use destructuring to isolate then remove this window
        const { [action.windowId]: removed, ...rest } = state;
        return rest;
      })
      .addCase(ActionTypes.IMPORT_MIRADOR_STATE, (_state, action) => {
        return action.state.elasticLayout || {};
      })
      .addCase(ActionTypes.ADD_WINDOW, (state, action) => {
        state[action.window.id] = deepmerge(state[action.window.id] || {}, {
          windowId: action.window.id,
          ...action.elasticLayout,
        });
      });
  },
});

export const { updateElasticWindowLayout } = elasticWindowLayoutSlice.actions;
export const elasticLayoutReducer = elasticWindowLayoutSlice.reducer;
