import fetch from 'node-fetch';

import { put, takeEvery } from 'redux-saga/effects';
import types from '../action-types';

/**
 * handle fetch manifest actions side effects
 * @param {Object} action
 */
function* handleFetchManifest(action) {
  yield put({
    type: types.REQUEST_MANIFEST,
    manifestId: action.manifestId,
  });
  try {
    const response = yield fetch(action.manifestId);
    const jsonResponse = yield response.json();
    yield put({
      type: types.RECEIVE_MANIFEST,
      manifestId: action.manifestId,
      manifestJson: jsonResponse,
    });
  } catch (e) {
    yield put({
      type: types.RECEIVE_MANIFEST_ERROR,
      manifestId: action.manifestId,
      error: e,
    });
  }
}

/**
 * start watching manifest actions
 */
export default function* watchManifest() {
  yield takeEvery(types.FETCH_MANIFEST, handleFetchManifest);
}
