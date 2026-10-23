import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { fetchCanvasAnnotations, fetchAnnotations } from '../../../src/state/sagas/annotations';
import { getCanvas } from '../../../src/state/selectors';
import { iiifApi } from '../../../src/state/api/iiifApi';

describe('annotation sagas', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchCanvasAnnotations', () => {
    it('requests IIIF v2-style annotations', () => {
      const initiateSpy = vi.spyOn(iiifApi.endpoints.getAnnotation, 'initiate').mockReturnValue(() => {});
      const action = {
        canvasId: 'a',
        windowId: 'foo',
      };

      return expectSaga(fetchCanvasAnnotations, action)
        .provide([[select(getCanvas, { canvasId: 'a', windowId: 'foo' }), { __jsonld: { otherContent: 'annoId' }, id: 'a' }]])
        .run()
        .then(() => {
          expect(initiateSpy).toHaveBeenCalledWith({ annotationId: 'annoId', targetId: 'a' });
        });
    });

    it('requests IIIF v3-style annotations', () => {
      const initiateSpy = vi.spyOn(iiifApi.endpoints.getAnnotation, 'initiate').mockReturnValue(() => {});
      const action = {
        canvasId: 'a',
        windowId: 'foo',
      };

      return expectSaga(fetchCanvasAnnotations, action)
        .provide([
          [
            select(getCanvas, { canvasId: 'a', windowId: 'foo' }),
            { __jsonld: { annotations: { id: 'annoId', type: 'AnnotationPage' } }, id: 'a' },
          ],
        ])
        .run()
        .then(() => {
          expect(initiateSpy).toHaveBeenCalledWith({ annotationId: 'annoId', targetId: 'a' });
        });
    });

    it('handles embedded IIIF v3-style annotations', () => {
      const upsertSpy = vi.spyOn(iiifApi.util, 'upsertQueryData').mockReturnValue(() => {});
      const action = {
        canvasId: 'a',
        windowId: 'foo',
      };

      const annotations = { id: 'annoId', items: [], type: 'AnnotationPage' };

      return expectSaga(fetchCanvasAnnotations, action)
        .provide([[select(getCanvas, { canvasId: 'a', windowId: 'foo' }), { __jsonld: { annotations }, id: 'a' }]])
        .run()
        .then(() => {
          expect(upsertSpy).toHaveBeenCalledWith('getAnnotation', { annotationId: 'annoId', targetId: 'a' }, annotations);
        });
    });
  });

  describe('fetchAnnotations', () => {
    it('requests annotations for each visible canvas', () => {
      const action = {
        visibleCanvases: ['a', 'b'],
        windowId: 'foo',
      };

      return expectSaga(fetchAnnotations, action)
        .put({
          canvasId: 'a',
          type: 'mirador/REQUEST_CANVAS_ANNOTATIONS',
          windowId: 'foo',
        })
        .put({
          canvasId: 'b',
          type: 'mirador/REQUEST_CANVAS_ANNOTATIONS',
          windowId: 'foo',
        })
        .run();
    });
  });
});
