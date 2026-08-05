import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash/omit';
import deepmerge from 'deepmerge';
import ActionTypes from '../actions/action-types';

/**
 * updateLayers - action creator
 *
 * Kept as a plain object literal (not slice-generated) so the action retains
 * its historic `mirador/UPDATE_LAYERS` type and flat shape — both are public
 * surface via the exported `ActionTypes`, and plugin sagas may pattern-match
 * or destructure fields directly off this action.
 */
export function updateLayers(windowId, canvasId, payload) {
  return {
    canvasId,
    payload,
    type: ActionTypes.UPDATE_LAYERS,
    windowId,
  };
}

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
