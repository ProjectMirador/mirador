import {
  all, call, spawn,
} from 'redux-saga/effects';

import iiifSaga from './iiif';
import windowSaga from './windows';

/** */
function* launchSaga(saga) {
  while (true) {
    try {
      yield call(saga);
      break;
    } catch (e) {
      console.log(e);
    }
  }
}

/** */
function getRootSaga(pluginSagas) {
  return function* rootSaga() {
    const sagas = [
      iiifSaga,
      windowSaga,
      ...pluginSagas,
    ];

    yield all(sagas.map(saga => spawn(launchSaga, saga)));
  };
}

export default getRootSaga;
