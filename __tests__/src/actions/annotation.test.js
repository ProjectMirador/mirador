import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('annotation actions', () => {
  describe('requestAnnotation', () => {
    it('requests an annotation from given a url', () => {
      const targetId = 'foo';
      const annotationId = 'abc123';
      const expectedAction = {
        annotationId,
        targetId,
        type: ActionTypes.REQUEST_ANNOTATION,
      };
      expect(actions.requestAnnotation(targetId, annotationId)).toEqual(expectedAction);
    });
  });
  describe('receiveAnnotation', () => {
    it('recieves an annotation', () => {
      const targetId = 'foo';
      const annotationId = 'abc123';
      const json = {
        annotationId,
        content: 'annotation request',
      };
      const expectedAction = {
        annotationId,
        annotationJson: json,
        targetId,
        type: ActionTypes.RECEIVE_ANNOTATION,
      };
      expect(actions.receiveAnnotation(targetId, annotationId, json)).toEqual(expectedAction);
    });
  });
  describe('fetchAnnotation', () => {
    describe('success response', () => {
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' })); // eslint-disable-line no-undef
      });
      it('dispatches the REQUEST_ANNOTATION action', () => {
        expect(actions.fetchAnnotation(
          'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
          'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
        )).toEqual({
          annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
          targetId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
          type: 'mirador/REQUEST_ANNOTATION',
        });
      });
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
