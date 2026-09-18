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
      // Supports both the legacy positional call (windowId, canvasId, payload) and
      // the RTK single payload object call ({ windowId, canvasId, ...payload }).
      prepare: (windowIdOrPayload, legacyCanvasId, legacyPayload) => {
        if (typeof windowIdOrPayload === 'object' && windowIdOrPayload !== null) {
          return { payload: windowIdOrPayload };
        }

        return { payload: { ...legacyPayload, windowId: windowIdOrPayload, canvasId: legacyCanvasId } };
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
