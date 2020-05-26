import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import MiradorManifest from '../../lib/MiradorManifest';
import {
  selectContentSearchAnnotations,
  selectContentSearchAnnotation,
  setWorkspaceViewportPosition,
  updateWindow,
  setCanvas,
  fetchSearch,
} from '../actions';
import {
  getSearchForWindow, getSearchAnnotationsForCompanionWindow,
  getCanvasGrouping, getWindow, getManifests, getManifestoInstance,
  getCompanionWindowIdsForPosition, getManifestSearchService,
  getCanvasForAnnotation,
  getSelectedContentSearchAnnotationIds,
  getSortedSearchAnnotationsForCompanionWindow,
  getVisibleCanvasIds,
  getWorkspace,
  getElasticLayout,
} from '../selectors';
import { fetchManifest } from './iiif';

/** */
export function* fetchWindowManifest(action) {
  const { manifestId } = action.payload || action.window;
  if (!manifestId) return;

  const manifests = yield select(getManifests);
  if (!manifests[manifestId]) yield call(fetchManifest, { manifestId });

  yield call(setWindowStartingCanvas, action);
  yield call(setWindowDefaultSearchQuery, action);
}

/** @private */
export function* setWindowStartingCanvas(action) {
  const { canvasId, canvasIndex, manifestId } = action.payload || action.window;

  const windowId = action.id || action.window.id;

  if (canvasId) {
    const thunk = yield call(setCanvas, windowId, canvasId);
    yield put(thunk);
  } else {
    const manifestoInstance = yield select(getManifestoInstance, { manifestId });
    if (manifestoInstance) {
      // set the startCanvas
      const miradorManifest = new MiradorManifest(manifestoInstance);
      const startCanvas = miradorManifest.startCanvas
        || miradorManifest.canvasAt(canvasIndex || 0)
        || miradorManifest.canvasAt(0);
      const thunk = yield call(setCanvas, windowId, startCanvas.id);
      if (startCanvas) yield put(thunk);
    }
  }
}

/** @private */
export function* setWindowDefaultSearchQuery(action) {
  // only for a brand new window
  if (!action.window || !action.window.defaultSearchQuery) return;

  const { id: windowId, defaultSearchQuery } = action.window;
  const searchService = yield select(getManifestSearchService, { windowId });
  const companionWindowIds = yield select(getCompanionWindowIdsForPosition, { position: 'left', windowId });
  const companionWindowId = companionWindowIds[0];

  if (searchService && companionWindowId) {
    const searchId = searchService && `${searchService.id}?q=${defaultSearchQuery}`;
    yield put(fetchSearch(windowId, companionWindowId, searchId, defaultSearchQuery));
  }
}

/** @private */
export function getAnnotationsBySearch(state, { canvasIds, companionWindowIds, windowId }) {
  const annotationBySearch = Object.keys(companionWindowIds)
    .reduce((accumulator, companionWindowId) => {
      const annotations = getSearchAnnotationsForCompanionWindow(state, {
        companionWindowId, windowId,
      });
      const resourceAnnotations = annotations.resources;
      const hitAnnotation = resourceAnnotations.find(r => canvasIds.includes(r.targetId));

      if (hitAnnotation) accumulator[companionWindowId] = [hitAnnotation.id];

      return accumulator;
    }, {});

  return annotationBySearch;
}

/** @private */
export function* selectAnnotationsOnCurrentCanvas({
  annotationId, windowId, visibleCanvases,
}) {
  if (annotationId && annotationId[0]) return;

  const searches = yield select(getSearchForWindow, { windowId });
  const companionWindowIds = Object.keys(searches || {});
  if (companionWindowIds.length === 0) return;

  const annotationBySearch = yield select(
    getAnnotationsBySearch, { canvasIds: visibleCanvases, companionWindowIds, windowId },
  );

  yield put(selectContentSearchAnnotations(windowId, annotationBySearch));
}

/** @private */
export function* panToFocusedWindow({ pan, windowId }) {
  if (!pan) return;
  const elasticLayout = yield select(getElasticLayout);
  const {
    x, y, width, height,
  } = elasticLayout[windowId] || {};

  const {
    viewportPosition: { width: viewWidth, height: viewHeight },
  } = yield select(getWorkspace);

  yield put(setWorkspaceViewportPosition({
    x: (x + width / 2) - viewWidth / 2,
    y: (y + height / 2) - viewHeight / 2,
  }));
}

/** @private */
export function* updateVisibleCanvases({ windowId }) {
  const { canvasId } = yield select(getWindow, { windowId });
  const visibleCanvases = yield select(getCanvasGrouping, { canvasId, windowId });
  yield put(updateWindow(windowId, { visibleCanvases: (visibleCanvases || []).map(c => c.id) }));
}

/** @private */
export function* setCanvasOfFirstSearchResult({ companionWindowId, windowId }) {
  const selectedIds = yield select(getSelectedContentSearchAnnotationIds, {
    companionWindowId, windowId,
  });

  if (selectedIds.length !== 0) return;

  const annotations = yield select(
    getSortedSearchAnnotationsForCompanionWindow, { companionWindowId, windowId },
  );
  if (!annotations || annotations.length === 0) return;

  const annotationIds = annotations.map(a => a.id);
  yield put(selectContentSearchAnnotation(windowId, companionWindowId, annotationIds));
}

/** @private */
export function* setCanvasforSelectedAnnotation({ annotationId, companionWindowId, windowId }) {
  const canvasIds = yield select(getVisibleCanvasIds, { windowId });
  const canvas = yield select(getCanvasForAnnotation, {
    annotationId: annotationId[0], companionWindowId, windowId,
  });

  if (!canvas || canvasIds.includes(canvas.id)) return;

  const thunk = yield call(setCanvas, windowId, canvas.id, undefined, { annotationId });
  yield put(thunk);
}

/** */
export default function* windowsSaga() {
  yield all([
    takeEvery(ActionTypes.ADD_WINDOW, fetchWindowManifest),
    takeEvery(ActionTypes.UPDATE_WINDOW, fetchWindowManifest),
    takeEvery(ActionTypes.SET_CANVAS, selectAnnotationsOnCurrentCanvas),
    takeEvery(ActionTypes.SET_WINDOW_VIEW_TYPE, updateVisibleCanvases),
    takeEvery(ActionTypes.RECEIVE_SEARCH, setCanvasOfFirstSearchResult),
    takeEvery(ActionTypes.SELECT_CONTENT_SEARCH_ANNOTATION, setCanvasforSelectedAnnotation),
    takeEvery(ActionTypes.FOCUS_WINDOW, panToFocusedWindow),
  ]);
}
