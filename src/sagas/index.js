import { all } from 'redux-saga/effects';

import watchManifest from './manifest';
import watchInfoResponse from './infoResponse';

/**
 * set up all action watchers
 * @param {Object} action
 */
export default function* rootSaga() {
  yield all([
    watchManifest(),
    watchInfoResponse(),
  ]);
}
