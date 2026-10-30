import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import {
  receiveManifest,
  receiveManifestFailure,
  receiveSearch,
  receiveSearchFailure,
  receiveAnnotation,
  receiveAnnotationFailure,
} from '../actions';
import { getManifests, getRequestsConfig } from '../selectors';

/** Normalize a caught error (e.g. DOMException, TypeError) to a plain, serializable string. */
function stringifyError(error) {
  return typeof error === 'object' ? String(error) : error;
}

/** */
function fetchWrapper(url, options, { success, degraded, failure }) {
  return fetch(url, options)
    .then((response) =>
      response
        .json()
        .then((json) => {
          if (response.status === 401) return (degraded || success)({ json, response });
          if (response.ok) return success({ json, response });
          return failure({ error: response.statusText, json, response });
        })
        .catch((error) => {
          // Error responses (4xx/5xx) often have a body that isn't valid JSON
          // only surface the raw parse error when the response was otherwise ok,
          // where it points to an actual unexpected JSON body bug.
          if (!response.ok) {
            return failure({ error: `${response.status} ${response.statusText}: ${url}`, response });
          }
          return failure({ error, response });
        }),
    )
    .catch((error) => failure({ error }));
}

/** */
function* fetchIiifResource(url, options, { success, degraded, failure }) {
  const { preprocessors = [], postprocessors = [] } = yield select(getRequestsConfig);

  try {
    const reqOptions = preprocessors.reduce((acc, f) => f(url, acc) || acc, options);

    let action = yield call(fetchWrapper, url, reqOptions, { degraded, failure, success });
    action = postprocessors.reduce((acc, f) => f(url, acc) || acc, action);
    return action;
  } catch (error) {
    return failure({ error });
  }
}

/** */
export function* fetchManifest({ manifestId }) {
  const callbacks = {
    failure: ({ error, json, response }) => receiveManifestFailure(manifestId, stringifyError(error)),
    success: ({ json, response }) => receiveManifest(manifestId, json),
  };
  const dispatch = yield call(fetchIiifResource, manifestId, {}, callbacks);
  yield put(dispatch);
}

/** @private */
export function* fetchSearchResponse({ windowId, companionWindowId, query, searchId }) {
  const callbacks = {
    failure: ({ error, json, response }) => receiveSearchFailure(windowId, companionWindowId, searchId, stringifyError(error)),
    success: ({ json, response }) => receiveSearch(windowId, companionWindowId, searchId, json),
  };
  const dispatch = yield call(fetchIiifResource, searchId, {}, callbacks);
  yield put(dispatch);
}

/** @private */
export function* fetchAnnotation({ targetId, annotationId }) {
  const callbacks = {
    failure: ({ error, json, response }) => receiveAnnotationFailure(targetId, annotationId, stringifyError(error)),
    success: ({ json, response }) => receiveAnnotation(targetId, annotationId, json),
  };
  const dispatch = yield call(fetchIiifResource, annotationId, {}, callbacks);
  yield put(dispatch);
}

/** */
export function* fetchResourceManifest({ manifestId, manifestJson }) {
  if (manifestJson) {
    yield put(receiveManifest(manifestId, manifestJson));
    return;
  }

  if (!manifestId) return;

  const manifests = yield select(getManifests) || {};
  if (!manifests[manifestId]) yield* fetchManifest({ manifestId });
}

/** */
export function* fetchManifests(...manifestIds) {
  const manifests = yield select(getManifests);

  for (let i = 0; i < manifestIds.length; i += 1) {
    const manifestId = manifestIds[i];
    if (!manifests[manifestId]) yield call(fetchManifest, { manifestId });
  }
}

/** */
export default function* iiifSaga() {
  yield all([
    takeEvery(ActionTypes.REQUEST_MANIFEST, fetchManifest),
    takeEvery(ActionTypes.REQUEST_SEARCH, fetchSearchResponse),
    takeEvery(ActionTypes.REQUEST_ANNOTATION, fetchAnnotation),
    takeEvery(ActionTypes.ADD_RESOURCE, fetchResourceManifest),
  ]);
}
