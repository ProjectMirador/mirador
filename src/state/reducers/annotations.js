import ActionTypes from '../actions/action-types';

/**
 * annotationReducer
 */
export const annotationsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_ANNOTATION:
      return {
        ...state,
        [action.canvasId]: {
          [action.annotationId]: {
            id: action.annotationId,
            isFetching: true,
          },
        },
      };
    case ActionTypes.RECEIVE_ANNOTATION:
      return {
        ...state,
        [action.canvasId]: {
          [action.annotationId]: {
            id: action.annotationId,
            json: action.annotationJson,
            isFetching: false,
          },
        },
      };
    case ActionTypes.RECEIVE_ANNOTATION_FAILURE:
      return {
        ...state,
        [action.canvasId]: {
          [action.annotationId]: {
            id: action.annotationId,
            error: action.error,
            isFetching: false,
          },
        },
      };
    default: return state;
  }
};
