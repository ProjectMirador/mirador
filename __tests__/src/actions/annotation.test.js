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
