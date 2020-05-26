import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import ActionTypes from '../actions/action-types';
import {
  receiveManifest, receiveManifestFailure,
} from '../actions';
import {
  getConfig,
} from '../selectors';

/** */
function fetchIiifResource(url, options, { success, degraded, failure }) {
  return fetch(url, options)
    .then(response => response.json().then((json) => {
      if (response.status === 401) return (degraded || success)({ json, response });
      if (response.ok) return success({ json, response });
      return failure({ error: response.statusText, json, response });
    }).catch(error => failure({ error, response })))
    .catch(error => failure({ error }));
}

/** */
export function* fetchManifest({ manifestId }) {
  const { resourceHeaders } = yield select(getConfig);
  const options = { headers: resourceHeaders };
  const callbacks = {
    failure: ({ error, json, response }) => receiveManifestFailure(manifestId, typeof error === 'object' ? String(error) : error),
    success: ({ json, response }) => receiveManifest(manifestId, json),
  };
  const dispatch = yield call(fetchIiifResource, manifestId, options, callbacks);
  yield put(dispatch);
}

/** */
export default function* iiifSaga() {
  yield all([
    takeEvery(ActionTypes.REQUEST_MANIFEST, fetchManifest),
  ]);
}
