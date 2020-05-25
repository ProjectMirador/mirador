import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import MiradorManifest from '../../lib/MiradorManifest';
import {
  updateWindow,
  setCanvas,
  fetchSearch,
} from '../actions';
import {
  getCanvasGrouping, getWindow, getManifests, getManifestoInstance,
  getCompanionWindowIdsForPosition, getManifestSearchService,
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
    takeEvery(ActionTypes.SET_WINDOW_VIEW_TYPE, updateVisibleCanvases),
  ]);
}
