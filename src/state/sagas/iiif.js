import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import normalizeUrl from 'normalize-url';
import ActionTypes from '../actions/action-types';
import {
  receiveManifest,
  receiveManifestFailure,
  receiveInfoResponse,
  receiveInfoResponseFailure,
  receiveDegradedInfoResponse,
  receiveSearch,
  receiveSearchFailure,
  receiveAnnotation,
  receiveAnnotationFailure,
  receiveProbeResponse,
  receiveProbeResponseFailure,
  receiveDegradedProbeResponse,
} from '../actions';
import { anyAuthServices, getTokenService } from '../../lib/getServices';
import { getManifests, getRequestsConfig, getAccessTokens, selectInfoResponse, selectProbeResponse } from '../selectors';

/** */
function fetchWrapper(url, options, { success, degraded, failure }) {
  console.log('[fetchWrapper] Making request to:', url);
  console.log('[fetchWrapper] Request options:', options);

  return fetch(url, options)
    .then((response) => {
      console.log('[fetchWrapper] Response received for:', url);
      console.log('[fetchWrapper] Response status:', response.status);
      console.log('[fetchWrapper] Response headers:', [...response.headers.entries()]);
      console.log('[fetchWrapper] Response URL (after redirects):', response.url);

      return response
        .json()
        .then((json) => {
          console.log('[fetchWrapper] JSON parsed:', json);

          if (response.status === 401) {
            console.log('[fetchWrapper] 401 response - calling degraded handler');
            return (degraded || success)({ json, response });
          }
          if (response.ok) {
            console.log('[fetchWrapper] OK response - calling success handler');
            return success({ json, response });
          }
          console.log('[fetchWrapper] Non-OK response - calling failure handler');
          return failure({ error: response.statusText, json, response });
        })
        .catch((error) => {
          console.log('[fetchWrapper] JSON parsing failed:', error);
          return failure({ error, response });
        });
    })
    .catch((error) => {
      console.log('[fetchWrapper] Fetch failed for:', url, error);
      return failure({ error });
    });
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
function* fetchIiifResourceWithAuth(url, iiifResource, options, { degraded, failure, success }) {
  const urlOptions = { ...options };
  let tokenServiceId;

  // If we have a requested IIIF resource (say, the image description from the manifest)
  // we can optimistically try an appropriate access token.
  //
  // TODO: there might be multiple applicable access token services
  if (iiifResource) {
    const tokenService = yield call(getAccessTokenService, iiifResource);
    tokenServiceId = tokenService && tokenService.id;

    if (tokenService && tokenService.json) {
      urlOptions.headers = {
        Authorization: `Bearer ${tokenService.json.accessToken}`,
        ...options.headers,
      };
    }
  }

  const { error, json, response } = yield call(fetchIiifResource, url, urlOptions, {
    failure: (arg) => arg,
    success: (arg) => arg,
  });

  // Hard error either requesting the resource or deserializing the JSON.
  if (error) {
    yield put(
      failure({
        error,
        json,
        response,
        tokenServiceId,
      }),
    );
    return;
  }

  const id = json['@id'] || json.id;
  if (response.ok) {
    if (
      id &&
      normalizeUrl(id, { stripAuthentication: false }) ===
        normalizeUrl(url.replace(/info\.json$/, ''), { stripAuthentication: false })
    ) {
      if (!json.substitute) {
        // substitute indicates the Auth2 equivalent of a degraded response, should fall through
        yield put(success({ json, response, tokenServiceId }));
        return;
      }
    }
  } else if (response.status !== 401) {
    yield put(
      failure({
        error,
        json,
        response,
        tokenServiceId,
      }),
    );

    return;
  }

  // Start attempting some IIIF Auth;
  // First, the IIIF resource we were given may not be authoritative; check if
  // it suggests a different access token service and re-enter the auth workflow
  const authoritativeTokenService = yield call(getAccessTokenService, json);
  if (authoritativeTokenService && authoritativeTokenService.id !== tokenServiceId) {
    yield call(fetchIiifResourceWithAuth, url, json, options, { degraded, failure, success });
    return;
  }

  // Record the response (potentially kicking off other auth flows)
  yield put((degraded || success)({ json, response, tokenServiceId }));
}

/** */
export function* fetchManifest({ manifestId }) {
  const callbacks = {
    failure: ({ error, json, response }) => receiveManifestFailure(manifestId, typeof error === 'object' ? String(error) : error),
    success: ({ json, response }) => receiveManifest(manifestId, json),
  };
  const dispatch = yield call(fetchIiifResource, manifestId, {}, callbacks);
  yield put(dispatch);
}

/** @private */
function* getAccessTokenService(resource) {
  const manifestoCompatibleResource = resource && resource.__jsonld ? resource : { ...resource, options: {} };
  const services = anyAuthServices(manifestoCompatibleResource);
  if (services.length === 0) return undefined;

  const accessTokens = yield select(getAccessTokens);
  if (!accessTokens) return undefined;

  for (let i = 0; i < services.length; i += 1) {
    const authService = services[i];
    const accessTokenService = getTokenService(authService);
    const token = accessTokenService && accessTokens[accessTokenService.id];
    if (token && token.json) return token;
  }

  return undefined;
}

/** @private */
export function* fetchInfoResponse({ imageResource, infoId, windowId }) {
  console.log('[fetchInfoResponse] Starting fetch for infoId:', infoId);
  console.log('[fetchInfoResponse] imageResource:', imageResource);
  console.log('[fetchInfoResponse] windowId:', windowId);

  let iiifResource = imageResource;
  if (!iiifResource) {
    iiifResource = yield select(selectInfoResponse, { infoId });
  }

  const callbacks = {
    degraded: ({ json, response, tokenServiceId }) => {
      console.log('[fetchInfoResponse] DEGRADED response received for:', infoId);
      console.log('[fetchInfoResponse] Degraded JSON:', json);
      console.log('[fetchInfoResponse] Response status:', response.status);
      return receiveDegradedInfoResponse(infoId, json, response.ok, tokenServiceId, windowId);
    },
    failure: ({ error, json, response, tokenServiceId }) => {
      console.log('[fetchInfoResponse] FAILURE response for:', infoId);
      console.log('[fetchInfoResponse] Error:', error);
      return receiveInfoResponseFailure(infoId, error, tokenServiceId);
    },
    success: ({ json, response, tokenServiceId }) => {
      console.log('[fetchInfoResponse] SUCCESS response for:', infoId);
      console.log('[fetchInfoResponse] JSON:', json);
      console.log('[fetchInfoResponse] Response status:', response.status);
      return receiveInfoResponse(infoId, json, response.ok, tokenServiceId);
    },
  };

  const finalUrl = `${infoId.replace(/\/$/, '')}/info.json`;
  console.log('[fetchInfoResponse] Final URL will be:', finalUrl);

  yield call(fetchIiifResourceWithAuth, finalUrl, iiifResource, {}, callbacks);
}

/** @private */
export function* fetchProbeResponse({ resource, probeId, windowId }) {
  console.log('[fetchProbeResponse] Starting probe fetch for probeId:', probeId);
  console.log('[fetchProbeResponse] resource:', resource);
  console.log('[fetchProbeResponse] windowId:', windowId);

  let iiifResource = resource;
  if (!iiifResource) {
    iiifResource = yield select(selectProbeResponse, { probeId });
  }

  const callbacks = {
    degraded: ({ json, response, tokenServiceId }) => {
      console.log('[fetchProbeResponse] DEGRADED probe response:', json);
      console.log('[fetchProbeResponse] Probe response status:', response.status);
      console.log('[fetchProbeResponse] Storing degraded with probeId:', probeId);
      console.log('[fetchProbeResponse] Time:', new Date().toISOString());
      return receiveDegradedProbeResponse(probeId, json, response.ok, tokenServiceId, windowId);
    },
    failure: ({ error, json, response, tokenServiceId }) => {
      console.log('[fetchProbeResponse] FAILED probe response:', error);
      return receiveProbeResponseFailure(probeId, error, tokenServiceId);
    },
    success: ({ json, response, tokenServiceId }) => {
      console.log('[fetchProbeResponse] SUCCESS probe response:', json);
      console.log('[fetchProbeResponse] Probe response status:', response.status);
      console.log('[fetchProbeResponse] Storing with probeId:', probeId);
      console.log('[fetchProbeResponse] Time:', new Date().toISOString());
      return receiveProbeResponse(probeId, json, response.ok, tokenServiceId);
    },
  };

  yield call(fetchIiifResourceWithAuth, probeId, iiifResource, {}, callbacks);
}

/** @private */
export function* fetchSearchResponse({ windowId, companionWindowId, query, searchId }) {
  const callbacks = {
    failure: ({ error, json, response }) => receiveSearchFailure(windowId, companionWindowId, searchId, error),
    success: ({ json, response }) => receiveSearch(windowId, companionWindowId, searchId, json),
  };
  const dispatch = yield call(fetchIiifResource, searchId, {}, callbacks);
  yield put(dispatch);
}

/** @private */
export function* fetchAnnotation({ targetId, annotationId }) {
  const callbacks = {
    failure: ({ error, json, response }) => receiveAnnotationFailure(targetId, annotationId, error),
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
    takeEvery(ActionTypes.REQUEST_INFO_RESPONSE, fetchInfoResponse),
    takeEvery(ActionTypes.REQUEST_PROBE_RESPONSE, fetchProbeResponse),
    takeEvery(ActionTypes.REQUEST_SEARCH, fetchSearchResponse),
    takeEvery(ActionTypes.REQUEST_ANNOTATION, fetchAnnotation),
    takeEvery(ActionTypes.ADD_RESOURCE, fetchResourceManifest),
  ]);
}
