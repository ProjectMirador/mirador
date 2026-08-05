import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash/omit';
import deepmerge from 'deepmerge';
import ActionTypes from '../actions/action-types';

/**
 * layersSlice - does a deep merge of the config
 *
 * Reacts to legacy action types (rather than generating its own) so that the
 * existing `updateLayers` action creator and any other code dispatching
 * `ActionTypes.UPDATE_LAYERS`/`REMOVE_WINDOW` keeps working unchanged.
 */
const layersSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(ActionTypes.UPDATE_LAYERS, (state, action) => {
        state[action.windowId] = {
          ...state[action.windowId],
          [action.canvasId]: deepmerge((state[action.windowId] || {})[action.canvasId] || {}, action.payload),
        };
      })
      .addCase(ActionTypes.REMOVE_WINDOW, (state, action) => omit(state, [action.windowId]));
  },
  initialState: {},
  name: 'layers',
  reducers: {},
});

export const layersReducer = layersSlice.reducer;
