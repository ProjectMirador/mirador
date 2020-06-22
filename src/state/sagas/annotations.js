import {
  all, put, select, takeEvery,
} from 'redux-saga/effects';
import { receiveAnnotation, requestAnnotation } from '../actions';
import { getAnnotations, getCanvases } from '../selectors';
import ActionTypes from '../actions/action-types';
import MiradorCanvas from '../../lib/MiradorCanvas';

/** Fetch annotations for the visible canvases */
export function* fetchAnnotations({ visibleCanvases: visibleCanvasIds, windowId }) {
  const canvases = yield select(getCanvases, { windowId });
  const visibleCanvases = (canvases || []).filter(c => visibleCanvasIds.includes(c.id));

  const annotations = yield select(getAnnotations);

  yield all(visibleCanvases.map((canvas) => {
    const miradorCanvas = new MiradorCanvas(canvas);

    return all([
      // IIIF v2
      ...miradorCanvas.annotationListUris
        .filter(uri => !(annotations[canvas.id] && annotations[canvas.id][uri]))
        .map(uri => put(requestAnnotation(canvas.id, uri))),
      // IIIF v3
      ...miradorCanvas.canvasAnnotationPages
        .filter(annotation => !(annotations[canvas.id] && annotations[canvas.id][annotation.id]))
        .map((annotation) => {
          // If there are no items, try to retrieve the referenced resource.
          // otherwise the resource should be embedded and just add to the store.
          if (!annotation.items) {
            return put(requestAnnotation(canvas.id, annotation.id));
          }

          return put(receiveAnnotation(canvas.id, annotation.id, annotation));
        }),
    ]);
  }));
}

/** */
export default function* appSaga() {
  yield all([
    takeEvery(ActionTypes.SET_CANVAS, fetchAnnotations),
  ]);
}
