import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { fetchAnnotations } from '../../../src/state/sagas/annotations';
import { getAnnotations, getCanvases } from '../../../src/state/selectors';

describe('annotation sagas', () => {
  describe('fetchAnnotations', () => {
    it('requests IIIF v2-style annotations for each visible canvas', () => {
      const action = {
        visibleCanvases: ['a', 'b'],
        windowId: 'foo',
      };

      return expectSaga(fetchAnnotations, action)
        .provide([
          [select(getCanvases, { windowId: 'foo' }), [
            { __jsonld: { otherContent: 'annoId' }, id: 'a' },
            { __jsonld: { otherContent: ['alreadyFetched'] }, id: 'b' },
          ]],
          [select(getAnnotations), { a: {}, b: { alreadyFetched: {} } }],
        ])
        .put({
          annotationId: 'annoId',
          targetId: 'a',
          type: 'mirador/REQUEST_ANNOTATION',
        })
        .run();
    });
    it('requests IIIF v3-style annotations for each visible canvas', () => {
      const action = {
        visibleCanvases: ['a', 'b'],
        windowId: 'foo',
      };

      return expectSaga(fetchAnnotations, action)
        .provide([
          [select(getCanvases, { windowId: 'foo' }), [
            { __jsonld: { annotations: { id: 'annoId', type: 'AnnotationPage' } }, id: 'a' },
          ]],
          [select(getAnnotations), { a: {} }],
        ])
        .put({
          annotationId: 'annoId',
          targetId: 'a',
          type: 'mirador/REQUEST_ANNOTATION',
        })
        .run();
    });
    it('handles embedded IIIF v3-style annotations on each visible canvas', () => {
      const action = {
        visibleCanvases: ['a', 'b'],
        windowId: 'foo',
      };

      const annotations = { id: 'annoId', items: [], type: 'AnnotationPage' };

      return expectSaga(fetchAnnotations, action)
        .provide([
          [select(getCanvases, { windowId: 'foo' }), [
            { __jsonld: { annotations }, id: 'a' },
          ]],
          [select(getAnnotations), { a: {} }],
        ])
        .put({
          annotationId: 'annoId',
          annotationJson: annotations,
          targetId: 'a',
          type: 'mirador/RECEIVE_ANNOTATION',
        })
        .run();
    });
  });
});
