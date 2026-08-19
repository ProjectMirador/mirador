import { createSlice } from '@reduxjs/toolkit';
import deepmerge from 'deepmerge';
import ActionTypes from '../actions/action-types';

const layersSlice = createSlice({
  name: 'layers',
  initialState: {},
  reducers: {
    updateLayers: {
      reducer(state, action) {
        const { windowId, canvasId, layerData } = action.payload;
        if (windowId === undefined || canvasId === undefined || layerData === undefined) {
          throw new Error(
            'updateLayers expects action.payload to be { windowId, canvasId, layerData } — ' +
              'dispatch the updateLayers(windowId, canvasId, layerData) action creator rather than constructing the action by hand.',
          );
        }
        state[windowId] = {
          ...state[windowId],
          [canvasId]: deepmerge((state[windowId] || {})[canvasId] || {}, layerData),
        };
      },
      prepare: (windowId, canvasId, layerData) => ({ payload: { windowId, canvasId, layerData } }),
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
