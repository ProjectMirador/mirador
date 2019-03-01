import { annotationsReducer } from '../../../src/state/reducers/annotations';
import ActionTypes from '../../../src/state/actions/action-types';

describe('annotation reducer', () => {
  it('should handle REQUEST_ANNOTATION', () => {
    expect(annotationsReducer({}, {
      type: ActionTypes.REQUEST_ANNOTATION,
      canvasId: 'foo',
      annotationId: 'abc123',
    })).toEqual({
      foo: {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
    });
  });
  it('should handle RECEIVE_ANNOTATION', () => {
    expect(annotationsReducer(
      {
        foo: {
          abc123: {
            id: 'abc123',
            isFetching: true,
          },
        },
      },
      {
        type: ActionTypes.RECEIVE_ANNOTATION,
        canvasId: 'foo',
        annotationId: 'abc123',
        annotationJson: {
          id: 'abc123',
          '@type': 'sc:AnnotationList',
          content: 'anno stuff',
        },
      },
    )).toMatchObject({
      foo: {
        abc123: {
          id: 'abc123',
          isFetching: false,
          json: {},
        },
      },
    });
  });
  it('should handle RECEIVE_ANNOTATION_FAILURE', () => {
    expect(annotationsReducer(
      {
        foo: {
          abc123: {
            id: 'abc123',
            isFetching: true,
          },
        },
      },
      {
        type: ActionTypes.RECEIVE_ANNOTATION_FAILURE,
        canvasId: 'foo',
        annotationId: 'abc123',
        error: "This institution didn't enable CORS.",
      },
    )).toEqual({
      foo: {
        abc123: {
          id: 'abc123',
          isFetching: false,
          error: "This institution didn't enable CORS.",
        },
      },
    });
  });
});
