import fetch from 'node-fetch';

import { put, takeEvery } from 'redux-saga/effects';
import types from '../action-types';

/**
 * handle fetch info response actions side effects
 * @param {Object} action
 */
function* handleFetchInfoResponse(action) {
  yield put({
    type: types.REQUEST_INFO_RESPONSE,
    infoId: action.infoId,
  });
  try {
    const response = yield fetch(action.infoId);
    const jsonResponse = yield response.json();
    yield put({
      type: types.RECEIVE_INFO_RESPONSE,
      infoId: action.infoId,
      infoJson: jsonResponse,
    });
  } catch (e) {
    yield put({
      type: types.RECEIVE_INFO_RESPONSE_ERROR,
      infoId: action.infoId,
      error: e,
    });
  }
}

/**
 * start watching info response actions
 */
export default function* watchInfoResponse() {
  yield takeEvery(types.FETCH_INFO_RESPONSE, handleFetchInfoResponse);
}
