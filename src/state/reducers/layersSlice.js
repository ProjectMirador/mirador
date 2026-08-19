import { createSlice } from '@reduxjs/toolkit';
import deepmerge from 'deepmerge';
import ActionTypes from '../actions/action-types';

const layersSlice = createSlice({
  name: 'layers',
  initialState: {},
  reducers: {
    updateLayers: {
      reducer(state, action) {
        if (action.payload.windowId === undefined || action.payload.canvasId === undefined) {
          throw new Error(
            'updateLayers expects action.payload to include { windowId, canvasId } — ' +
              'dispatch the updateLayers(windowId, canvasId, payload) action creator rather than constructing the action by hand.',
          );
        }

        const { windowId, canvasId, ...payload } = action.payload;
        state[windowId] = {
          ...state[windowId],
          [canvasId]: deepmerge((state[windowId] || {})[canvasId] || {}, payload),
        };
      },
      prepare: (windowId, canvasId, payload) => ({ payload: { ...payload, windowId, canvasId } }),
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
