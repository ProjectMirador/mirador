import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import {
  setWorkspaceViewportPosition,
  updateWindow,
  setCanvas,
  receiveManifest,
  fetchInfoResponse,
  showCollectionDialog,
} from '../actions';
import {
  getCanvasGrouping,
  getWindow,
  getManifestoInstance,
  getWorkspace,
  getElasticLayout,
  getCanvases,
  selectInfoResponses,
  getMiradorCanvasWrapper,
  getMiradorManifestWrapper,
} from '../selectors';
import { fetchManifests } from './iiif';
import { getIiifResourceImageService } from '../../lib/iiif';

/** */
export function* fetchWindowManifest(action) {
  const { collectionPath, id, manifestId } = action.payload || action.window;

  if (!manifestId) return;

  if (action.manifest) {
    yield put(receiveManifest(manifestId, action.manifest));
  } else {
    yield call(fetchManifests, manifestId, ...(collectionPath || []));
  }

  yield call(setWindowStartingCanvas, action);
  if (!collectionPath) {
    yield call(setCollectionPath, { manifestId, windowId: action.id || action.window.id });
  }
  yield call(determineAndShowCollectionDialog, manifestId, id);
}

/** */
export function* setCanvasOnNewSequence(action) {
  const windowId = action.id;
  if (!action || !action.payload || !action.payload.sequenceId) return;

  const canvases = yield select(getCanvases, { windowId });
  if (!canvases || !canvases[0] || !canvases[0].id) return;

  const thunk = yield call(setCanvas, windowId, canvases[0].id);
  yield put(thunk);
}

/** */
export function* setCollectionPath({ manifestId, windowId }) {
  const manifestoInstance = yield select(getManifestoInstance, { manifestId });

  if (manifestoInstance) {
    const partOfs = manifestoInstance.getProperty('partOf');
    const partOf = Array.isArray(partOfs) ? partOfs[0] : partOfs;

    if (partOf && partOf.id) {
      yield put(updateWindow(windowId, { collectionPath: [partOf.id] }));
    }
  }
}

/** */
export function* fetchCollectionManifests(action) {
  const { collectionPath } = action.payload;
  if (!collectionPath) return;

  yield call(fetchManifests, ...collectionPath);
}

/**
 * @private
 * `canvasIndex` is not an officially documented/supported window setting --
 * prefer `canvasId` (see the example window config in config/settings.js).
 * It's only read here for backwards compatibility with older configs/exported
 * state that may already set it.
 */
export function* setWindowStartingCanvas(action) {
  const { canvasId, canvasIndex, manifestId } = action.payload || action.window;

  const windowId = action.id || action.window.id;

  if (canvasId) {
    // Preserve viewport when initialViewerConfig exists, event if the preserveViewport OSD setting is set to false
    const preserveViewport = !!action.payload || !!action.window?.initialViewerConfig;
    // When canvasId is explicitly provided, always pass preserveViewport flag
    const thunk = yield call(setCanvas, windowId, canvasId, null, { preserveViewport });
    yield put(thunk);
  } else {
    const getMiradorManifest = yield select(getMiradorManifestWrapper);
    const manifestoInstance = yield select(getManifestoInstance, { manifestId });
    if (manifestoInstance) {
      // set the startCanvas
      const miradorManifest = getMiradorManifest(manifestoInstance);
      const startCanvas =
        miradorManifest.startCanvas || miradorManifest.canvasAt(canvasIndex || 0) || miradorManifest.canvasAt(0);
      if (startCanvas) {
        const preserveViewport = !!action.payload || !!action.window?.initialViewerConfig;
        // When canvas is calculated, only pass preserveViewport when true
        const thunk = preserveViewport
          ? yield call(setCanvas, windowId, startCanvas.id, null, { preserveViewport })
          : yield call(setCanvas, windowId, startCanvas.id);
        yield put(thunk);
      }
    }
  }
}

/** @private */
export function* panToFocusedWindow({ pan, windowId }) {
  if (!pan) return;
  const elasticLayout = yield select(getElasticLayout);
  const { x, y, width, height } = elasticLayout[windowId] || {};

  const {
    viewportPosition: { width: viewWidth, height: viewHeight },
  } = yield select(getWorkspace);

  yield put(
    setWorkspaceViewportPosition({
      x: x + width / 2 - viewWidth / 2,
      y: y + height / 2 - viewHeight / 2,
    }),
  );
}

/** @private */
export function* updateVisibleCanvases({ windowId }) {
  const { canvasId } = yield select(getWindow, { windowId });
  const visibleCanvases = yield select(getCanvasGrouping, { canvasId, windowId });

  const thunk = yield call(
    setCanvas,
    windowId,
    canvasId,
    (visibleCanvases || []).map((c) => c.id),
  );
  yield put(thunk);
}

/** Fetch info responses for the visible canvases */
export function* fetchInfoResponses({ visibleCanvases: visibleCanvasIds, windowId }) {
  const canvases = yield select(getCanvases, { windowId });
  const infoResponses = yield select(selectInfoResponses);
  const visibleCanvases = (canvases || []).filter((c) => visibleCanvasIds.includes(c.id));
  const getMiradorCanvas = yield select(getMiradorCanvasWrapper);

  yield all(
    visibleCanvases.map((canvas) => {
      const miradorCanvas = getMiradorCanvas(canvas);
      return all(
        miradorCanvas.iiifImageResources
          .map(
            (imageResource) =>
              !infoResponses[getIiifResourceImageService(imageResource)?.id] &&
              put(fetchInfoResponse({ imageResource, windowId })),
          )
          .filter(Boolean),
      );
    }),
  );
}

export function* setCanvasforSelectedAnnotation({ canvasId, windowId }) {
  if (!canvasId) return;
  const window = yield select(getWindow, { windowId });
  if (window?.canvasId === canvasId) return;

  const thunk = yield call(setCanvas, windowId, canvasId);
  yield put(thunk);
}

/** */
export function* determineAndShowCollectionDialog(manifestId, windowId) {
  const manifestoInstance = yield select(getManifestoInstance, { manifestId });
  if (manifestoInstance && manifestoInstance.isCollection()) {
    yield put(showCollectionDialog(manifestId, [], windowId));
  }
}

/** */
export default function* windowsSaga() {
  yield all([
    takeEvery(ActionTypes.ADD_WINDOW, fetchWindowManifest),
    takeEvery(ActionTypes.UPDATE_WINDOW, fetchWindowManifest),
    takeEvery(ActionTypes.UPDATE_WINDOW, setCanvasOnNewSequence),
    takeEvery(ActionTypes.UPDATE_WINDOW, fetchCollectionManifests),
    takeEvery(ActionTypes.SET_CANVAS, fetchInfoResponses),
    takeEvery(ActionTypes.UPDATE_COMPANION_WINDOW, fetchCollectionManifests),
    takeEvery(ActionTypes.SET_WINDOW_VIEW_TYPE, updateVisibleCanvases),
    takeEvery(ActionTypes.SELECT_ANNOTATION, setCanvasforSelectedAnnotation),
    takeEvery(ActionTypes.FOCUS_WINDOW, panToFocusedWindow),
  ]);
}
