import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('annotation actions', () => {
  describe('requestCanvasAnnotations', () => {
    it('requests all the annotations for a canvas', () => {
      const canvasId = 'foo';
      const windowId = 'abc123';
      const expectedAction = {
        canvasId,
        type: ActionTypes.REQUEST_CANVAS_ANNOTATIONS,
        windowId,
      };
      expect(actions.requestCanvasAnnotations(windowId, canvasId)).toEqual(expectedAction);
    });
  });
  describe('requestAnnotation', () => {
    it('requests an annotation from the legacy positional call', () => {
      const targetId = 'foo';
      const annotationId = 'abc123';
      const expectedAction = {
        payload: { annotationId, targetId },
        type: ActionTypes.REQUEST_ANNOTATION,
      };
      expect(actions.requestAnnotation(targetId, annotationId)).toEqual(expectedAction);
    });

    it('requests an annotation from a single-object call', () => {
      const targetId = 'foo';
      const annotationId = 'abc123';
      const expectedAction = {
        payload: { annotationId, targetId },
        type: ActionTypes.REQUEST_ANNOTATION,
      };
      expect(actions.requestAnnotation({ annotationId, targetId })).toEqual(expectedAction);
    });
  });
  describe('receiveAnnotation', () => {
    it('recieves an annotation from the legacy positional call', () => {
      const targetId = 'foo';
      const annotationId = 'abc123';
      const json = {
        annotationId,
        content: 'annotation request',
      };
      const expectedAction = {
        payload: { annotationId, annotationJson: json, targetId },
        type: ActionTypes.RECEIVE_ANNOTATION,
      };
      expect(actions.receiveAnnotation(targetId, annotationId, json)).toEqual(expectedAction);
    });

    it('recieves an annotation from a single-object call', () => {
      const targetId = 'foo';
      const annotationId = 'abc123';
      const json = {
        annotationId,
        content: 'annotation request',
      };
      const expectedAction = {
        payload: { annotationId, annotationJson: json, targetId },
        type: ActionTypes.RECEIVE_ANNOTATION,
      };
      expect(actions.receiveAnnotation({ annotationId, annotationJson: json, targetId })).toEqual(expectedAction);
    });
  });
  describe('receiveAnnotationFailure', () => {
    it('receives an annotation failure from the legacy positional call', () => {
      const targetId = 'foo';
      const annotationId = 'abc123';
      const error = 'Something went wrong';
      const expectedAction = {
        payload: { annotationId, error, targetId },
        type: ActionTypes.RECEIVE_ANNOTATION_FAILURE,
      };
      expect(actions.receiveAnnotationFailure(targetId, annotationId, error)).toEqual(expectedAction);
    });

    it('receives an annotation failure from a single-object call', () => {
      const targetId = 'foo';
      const annotationId = 'abc123';
      const error = 'Something went wrong';
      const expectedAction = {
        payload: { annotationId, error, targetId },
        type: ActionTypes.RECEIVE_ANNOTATION_FAILURE,
      };
      expect(actions.receiveAnnotationFailure({ annotationId, error, targetId })).toEqual(expectedAction);
    });
  });

  it('handles the selectAnnotation action', () => {
    const windowId = 'wId1';
    const annotationId = 'aId1';
    const expectedAction = {
      annotationId,
      type: ActionTypes.SELECT_ANNOTATION,
      windowId,
    };
    expect(actions.selectAnnotation(windowId, annotationId)).toEqual(expectedAction);
  });

  it('handles the deselectAnnotation action', () => {
    const windowId = 'wId1';
    const annotationId = 'aId1';
    const expectedAction = {
      annotationId,
      type: ActionTypes.DESELECT_ANNOTATION,
      windowId,
    };
    expect(actions.deselectAnnotation(windowId, annotationId)).toEqual(expectedAction);
  });

  it('handles the toggleAnnotationDisplay action', () => {
    const windowId = 'wId1';
    const expectedAction = {
      type: ActionTypes.TOGGLE_ANNOTATION_DISPLAY,
      windowId,
    };
    expect(actions.toggleAnnotationDisplay(windowId)).toEqual(expectedAction);
  });

  it('handles the hoverAnnotation action', () => {
    const windowId = 'wId1';
    const annotationIds = ['aId1'];
    const expectedAction = {
      annotationIds,
      type: ActionTypes.HOVER_ANNOTATION,
      windowId,
    };
    expect(actions.hoverAnnotation(windowId, annotationIds)).toEqual(expectedAction);
  });
});
