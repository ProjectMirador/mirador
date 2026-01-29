import { all, call, put, select, takeEvery, delay } from 'redux-saga/effects';
import { Utils } from 'manifesto.js';
import flatten from 'lodash/flatten';
import ActionTypes from '../actions/action-types';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { getTokenService, getProbeService } from '../../lib/getServices';
import {
  addAuthenticationRequest,
  resolveAuthenticationRequest,
  requestAccessToken,
  resetAuthenticationState,
  requestProbeResponse,
} from '../actions';
import {
  selectInfoResponses,
  selectProbeResponses,
  getVisibleCanvases,
  getWindows,
  getConfig,
  getAuth,
  getAccessTokens,
  getMiradorCanvasWrapper,
} from '../selectors';
import { fetchInfoResponse, fetchProbeResponse } from './iiif';

/** */
export function* refetchInfoResponsesOnLogout({ tokenServiceId }) {
  // delay logout actions to give the cookie service a chance to invalidate our cookies
  // before we reinitialize openseadragon and rerequest images.

  yield delay(2000);
  yield call(refetchInfoResponses, { serviceId: tokenServiceId });
}

/**
 * Figure out what info responses could have used the access token service and:
 *   - refetch, if they are currently visible
 *   - throw them out (and lazy re-fetch) otherwise
 */
export function* refetchInfoResponses({ serviceId }) {
  const windows = yield select(getWindows);

  const canvases = yield all(Object.keys(windows).map((windowId) => select(getVisibleCanvases, { windowId })));

  const getMiradorCanvas = yield select(getMiradorCanvasWrapper);

  const visibleImageApiIds = flatten(flatten(canvases).map((canvas) => getMiradorCanvas(canvas).imageServiceIds));

  const infoResponses = yield select(selectInfoResponses);
  /** */
  const haveThisTokenService = (infoResponse) => {
    const services = Utils.getServices(infoResponse);
    return services.some(e => {
      const infoTokenService = getTokenService(e);
      return infoTokenService && infoTokenService.id === serviceId;
    });
  };

  const obsoleteInfoResponses = Object.values(infoResponses).filter((i) => i.json && haveThisTokenService(i.json));

  yield all(
    obsoleteInfoResponses.map(({ id: infoId }) => {
      if (visibleImageApiIds.includes(infoId)) {
        return call(fetchInfoResponse, { infoId });
      }
      return put({ infoId, type: ActionTypes.REMOVE_INFO_RESPONSE });
    }),
  );
}

/** */
export function* refetchProbeResponsesOnLogout({ tokenServiceId }) {
  // delay logout actions to give the cookie service a chance to invalidate our cookies
  // before we reinitialize openseadragon and rerequest images.

  yield delay(2000);
  yield call(refetchProbeResponses, { serviceId: tokenServiceId });
}

/**
 * Figure out what probe responses could have used the access token service and:
 *   - refetch, if they are currently visible
 *   - throw them out (and lazy re-fetch) otherwise
 */
export function* refetchProbeResponses({ serviceId }) {
  const windows = yield select(getWindows);

  const canvases = yield all(
    Object.keys(windows).map(windowId => select(getVisibleCanvases, { windowId })),
  );

  const visibleProbeServiceIds = flatten(flatten(canvases).map((canvas) => {
    const miradorCanvas = new MiradorCanvas(canvas);
    return miradorCanvas.imageResources.filter((r) => getProbeService(r)).map((r) => getProbeService(r));
  }));

  const probeResponses = yield select(selectProbeResponses);
  /** */
  const haveThisTokenService = probeResponse => {
    const services = Utils.getServices(probeResponse);
    return services.some(e => {
      const probeTokenService = getTokenService(e);
      return probeTokenService && probeTokenService.id === serviceId;
    });
  };

  const obsoleteProbeResponses = Object.values(probeResponses).filter(
    i => i.json && haveThisTokenService(i.json),
  );

  yield all(obsoleteProbeResponses.map(({ id: probeId }) => {
    if (visibleProbeServiceIds.includes(probeId)) {
      return call(fetchProbeResponse, { probeId });
    }
    return put({ probeId, type: ActionTypes.REMOVE_PROBE_RESPONSE });
  }));
}

/** try to start any non-interactive auth flows */
export function* doAuthWorkflow({ infoJson, windowId }) {
  const auths = yield select(getAuth);
  const { auth: { serviceProfiles = [] } = {} } = yield select(getConfig);
  
  // For Auth 2.0, we should handle both interactive and non-interactive flows
  // Auth 2.0 "active" profile is interactive and should show auth dialog
  const authServices = Utils.getServices(infoJson).filter(s => !auths[s.id]);
  
  for (const authService of authServices) {
    const profile = authService.getProfile();
    
    // Handle Auth 2.0 services (identified by type)
    if (authService.getProperty && authService.getProperty('type') === 'AuthAccessService2') {
      // Auth 2.0 service - always trigger authentication request for active/interactive profiles
      yield put(addAuthenticationRequest(windowId, authService.id, profile));
      
      // Also check if this info.json has probe services we should fetch
      // According to IIIF spec, probe services MUST be in info.json
      const probeServices = Utils.getServices(infoJson).filter(s => 
        s.getProperty && s.getProperty('type') === 'AuthProbeService2'
      );
      
      // Fetch probe responses for any probe services found in this info.json
      for (const probeService of probeServices) {
        yield put(requestProbeResponse({ 
          resource: infoJson,
          probeId: probeService.id,
          windowId
        }));
      }
      
      return;
    }
    
    // Handle Auth 1.0 non-interactive services (original logic)
    const nonInteractiveAuthFlowProfiles = serviceProfiles.filter(p => p.external || p.kiosk);
    const profileConfig = nonInteractiveAuthFlowProfiles.find(p => p.profile === profile);
    
    if (profileConfig) {
      if (profileConfig.kiosk) {
        yield put(addAuthenticationRequest(windowId, authService.id, profile));
        return;
      } else if (profileConfig.external) {
        const tokenService = getTokenService(authService);
        if (!tokenService) continue;
        yield put(resolveAuthenticationRequest(authService.id, tokenService.id));
        yield put(requestAccessToken(tokenService.id, authService.id));
        return;
      }
    }
  }
}

/** */
export function* rerequestOnAccessTokenFailure({ infoJson, windowId, tokenServiceId }) {
  if (!tokenServiceId) return;

  // make sure we have an auth service to try
  const authService = Utils.getServices(infoJson).find(service => {
    const tokenService = getTokenService(service);

    return tokenService && tokenService.id === tokenServiceId;
  });

  if (!authService) return;

  // make sure the token ever worked (and might have expired or needs to be re-upped)
  const accessTokenServices = yield select(getAccessTokens);
  const service = accessTokenServices[tokenServiceId];
  if (!(service && service.success)) return;

  yield put(requestAccessToken(tokenServiceId, authService.id));
}

/** */
export function* invalidateInvalidAuth({ serviceId }) {
  const accessTokenServices = yield select(getAccessTokens);
  const authServices = yield select(getAuth);

  const accessTokenService = accessTokenServices[serviceId];
  if (!accessTokenService) return;
  const authService = authServices[accessTokenService.authId];
  if (!authService) return;

  if (accessTokenService.success) {
    // if the token ever worked, reset things so we try to get a new cookie
    yield put(
      resetAuthenticationState({
        authServiceId: authService.id,
        tokenServiceId: accessTokenService.id,
      }),
    );
  } else {
    // if the token never worked, mark the auth service as bad so we could
    // try to pick a different service
    yield put(resolveAuthenticationRequest(authService.id, accessTokenService.id, { ok: false }));
  }
}

/** */
export default function* authSaga() {
  yield all([
    takeEvery(ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE, rerequestOnAccessTokenFailure),
    takeEvery(ActionTypes.RECEIVE_DEGRADED_PROBE_RESPONSE, rerequestOnAccessTokenFailure),
    takeEvery(ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE, invalidateInvalidAuth),
    takeEvery(ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE, doAuthWorkflow),
    takeEvery(ActionTypes.RECEIVE_DEGRADED_PROBE_RESPONSE, doAuthWorkflow),
    takeEvery(ActionTypes.RECEIVE_ACCESS_TOKEN, refetchInfoResponses),
    takeEvery(ActionTypes.RECEIVE_ACCESS_TOKEN, refetchProbeResponses),
    takeEvery(ActionTypes.RESET_AUTHENTICATION_STATE, refetchInfoResponsesOnLogout),
    takeEvery(ActionTypes.RESET_AUTHENTICATION_STATE, refetchProbeResponsesOnLogout),
  ]);
}
