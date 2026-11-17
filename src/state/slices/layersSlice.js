import { createSlice } from '@reduxjs/toolkit';
import deepmerge from 'deepmerge';
import ActionTypes from '../actions/action-types';

const layersSlice = createSlice({
  name: 'layers',
  initialState: {},
  reducers: {
    updateLayers: {
      reducer(state, action) {
        const { windowId, canvasId, ...payload } = action.payload || {};

        if (windowId === undefined || canvasId === undefined) {
          throw new Error(
            'updateLayers expects action.payload to include { windowId, canvasId } — ' +
              'dispatch the updateLayers(windowId, canvasId, payload) action creator, or ' +
              'updateLayers({ windowId, canvasId, ...payload }), rather than constructing the action by hand.',
          );
        }

        state[windowId] = {
          ...state[windowId],
          [canvasId]: deepmerge((state[windowId] || {})[canvasId] || {}, payload),
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ActionTypes.REMOVE_WINDOW, (state, action) => {
      // use destructuring to isolate then remove this window
      const { [action.windowId]: removed, ...rest } = state;
      return rest;
    });
  },
});

export const { updateLayers } = layersSlice.actions;
export const layersReducer = layersSlice.reducer;
