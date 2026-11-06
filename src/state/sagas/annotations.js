import { all, put, select, takeEvery } from 'redux-saga/effects';
import { requestCanvasAnnotations } from '../actions';
import { getCanvas, getMiradorCanvasWrapper } from '../selectors';
import ActionTypes from '../actions/action-types';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { iiifApi } from '../api/iiifApi';

/**
 * Fetch annotations for a given canvas.
 * iiifApi.getAnnotation dedupes/caches identical requests.
 */
export function* fetchCanvasAnnotations({ canvasId, windowId }) {
  const canvas = yield select(getCanvas, { canvasId, windowId });
  const getMiradorCanvas = yield select(getMiradorCanvasWrapper);
  const miradorCanvas = getMiradorCanvas(canvas);

  return yield all([
    // IIIF v2
    ...miradorCanvas.annotationListUris.map((uri) =>
      put(iiifApi.endpoints.getAnnotation.initiate({ annotationId: uri, targetId: canvas.id })),
    ),
    // IIIF v3
    ...miradorCanvas.canvasAnnotationPages.map((annotation) => {
      // If there are no items, try to retrieve the referenced resource.
      // otherwise the resource is already embedded -- seed the cache
      // directly rather than triggering a pointless fetch.
      if (!annotation.items) {
        return put(iiifApi.endpoints.getAnnotation.initiate({ annotationId: annotation.id, targetId: canvas.id }));
      }

      return put(iiifApi.util.upsertQueryData('getAnnotation', { annotationId: annotation.id, targetId: canvas.id }, annotation));
    }),
  ]);
}

/**
 * Fetch annotations for the visible canvases.
 */
export function* fetchAnnotations({ visibleCanvases = [], windowId }) {
  // this little indirection allows plugins to also handle the request
  return yield all(visibleCanvases.map((canvasId) => put(requestCanvasAnnotations(windowId, canvasId))));
}

/** */
export default function* appSaga() {
  yield all([
    takeEvery(ActionTypes.REQUEST_CANVAS_ANNOTATIONS, fetchCanvasAnnotations),
    takeEvery(ActionTypes.SET_CANVAS, fetchAnnotations),
  ]);
}
