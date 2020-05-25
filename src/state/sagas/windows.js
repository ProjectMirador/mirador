import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import MiradorManifest from '../../lib/MiradorManifest';
import {
  selectContentSearchAnnotations,
  setWorkspaceViewportPosition,
  updateWindow,
  setCanvas,
  fetchSearch,
} from '../actions';
import {
  getSearchForWindow, getSearchAnnotationsForCompanionWindow,
  getCanvasGrouping, getWindow, getManifests, getManifestoInstance,
  getCompanionWindowIdsForPosition, getManifestSearchService,
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

/** */
function* selectAnnotationsOnCurrentCanvas({ canvasIds, windowId }) {
  const searches = yield select(getSearchForWindow, { windowId });

  if (!searches) return;

  const state = yield select(s => s);
  const annotationBySearch = Object.keys(searches).reduce((accumulator, companionWindowId) => {
    const annotations = getSearchAnnotationsForCompanionWindow(
      state, { companionWindowId, windowId },
    );
    const resourceAnnotations = annotations.resources;
    const hitAnnotation = resourceAnnotations.find(r => canvasIds.includes(r.targetId));

    if (hitAnnotation) accumulator[companionWindowId] = [hitAnnotation.id];

    return accumulator;
  }, {});

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

/** */
export default function* windowsSaga() {
  yield all([
    takeEvery(ActionTypes.ADD_WINDOW, fetchWindowManifest),
    takeEvery(ActionTypes.UPDATE_WINDOW, fetchWindowManifest),
    takeEvery(ActionTypes.SET_CANVAS, selectAnnotationsOnCurrentCanvas),
    takeEvery(ActionTypes.SET_WINDOW_VIEW_TYPE, updateVisibleCanvases),
    takeEvery(ActionTypes.FOCUS_WINDOW, panToFocusedWindow),
  ]);
}
