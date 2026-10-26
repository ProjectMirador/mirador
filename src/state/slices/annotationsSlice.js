import { createSlice } from '@reduxjs/toolkit';
import ActionTypes from '../actions/action-types';

const annotationsSlice = createSlice({
  name: 'annotations',
  initialState: {},
  reducers: {
    requestAnnotation: {
      reducer(state, action) {
        const { targetId, annotationId } = action.payload;

        state[targetId] = {
          ...state[targetId],
          [annotationId]: {
            id: annotationId,
            isFetching: true,
          },
        };
      },
    },
    receiveAnnotation: {
      reducer(state, action) {
        const { targetId, annotationId, annotationJson } = action.payload;

        state[targetId] = {
          ...state[targetId],
          [annotationId]: {
            id: annotationId,
            isFetching: false,
            json: annotationJson,
          },
        };
      },
    },
    receiveAnnotationFailure: {
      reducer(state, action) {
        const { targetId, annotationId, error } = action.payload;

        state[targetId] = {
          ...state[targetId],
          [annotationId]: {
            error,
            id: annotationId,
            isFetching: false,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ActionTypes.IMPORT_MIRADOR_STATE, () => ({}));
  },
});

export const { requestAnnotation, receiveAnnotation, receiveAnnotationFailure } = annotationsSlice.actions;
export const annotationsReducer = annotationsSlice.reducer;
