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
  // Prevent auth workflow if infoJson is undefined
  if (!infoJson) {
    console.log('[doAuthWorkflow] Skipping auth workflow - infoJson is undefined');
    return;
  }

  const auths = yield select(getAuth);
  const { auth: { serviceProfiles = [] } = {} } = yield select(getConfig);
  
  console.log('[doAuthWorkflow] Starting auth workflow for infoJson:', infoJson);
  console.log('[doAuthWorkflow] Services found:', Utils.getServices(infoJson));
  
  // For Auth 2.0, check for probe services first (per IIIF spec)
  const probeServices = Utils.getServices(infoJson).filter(s => 
    s.getProperty && s.getProperty('type') === 'AuthProbeService2'
  );
  
  console.log('[doAuthWorkflow] Found probe services:', probeServices);
  
  // If we have Auth 2.0 probe services, handle them
  if (probeServices.length > 0) {
    for (const probeService of probeServices) {
      console.log('[doAuthWorkflow] Requesting probe response for:', probeService.id);
      
      // Only request probe response if not already requested or fetching
      const probeResponses = yield select(selectProbeResponses);
      const existingProbeResponse = probeResponses[probeService.id];
      
      if (!existingProbeResponse || (!existingProbeResponse.isFetching && !existingProbeResponse.json)) {
        console.log('[doAuthWorkflow] Requesting new probe response');
        yield put(requestProbeResponse(
          probeService.id,
          infoJson,
          windowId
        ));
      } else {
        console.log('[doAuthWorkflow] Probe response already exists or fetching:', existingProbeResponse);
      }
      // Also check for nested access services in the probe service
      const nestedAccessServices = Utils.getServices(probeService).filter(s => 
        s.getProperty && s.getProperty('type') === 'AuthAccessService2'
      );
      
      for (const accessService of nestedAccessServices) {
        const profile = accessService.getProperty('profile');
        console.log('[doAuthWorkflow] Found nested access service with profile:', profile);
        
        // Only add auth request if not already in progress
        if (!auths[accessService.id] || (!auths[accessService.id].isFetching && auths[accessService.id].ok === undefined)) {
          console.log('[doAuthWorkflow] Adding new auth request for:', accessService.id);
          yield put(addAuthenticationRequest(windowId, accessService.id, profile));
        } else {
          console.log('[doAuthWorkflow] Auth request already exists for:', accessService.id, auths[accessService.id]);
        }
      }
    }
    return;
  }
  
  // Fallback to Auth 1.0 detection for access services directly in info.json
  const authServices = Utils.getServices(infoJson).filter(s => !auths[s.id]);
  
  for (const authService of authServices) {
    const profile = authService.getProfile();
    
    // Handle Auth 2.0 services (identified by type) - but these should be nested in probe services
    if (authService.getProperty && authService.getProperty('type') === 'AuthAccessService2') {
      console.log('[doAuthWorkflow] Found standalone Auth2 access service (unusual):', authService.id);
      yield put(addAuthenticationRequest(windowId, authService.id, profile));
      continue;
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
    takeEvery(ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE, function* (action) {
      console.log('[authSaga] RECEIVE_DEGRADED_INFO_RESPONSE triggered:', action);
      yield call(rerequestOnAccessTokenFailure, action);
    }),
    takeEvery(ActionTypes.RECEIVE_DEGRADED_PROBE_RESPONSE, function* (action) {
      console.log('[authSaga] RECEIVE_DEGRADED_PROBE_RESPONSE triggered:', action);
      yield call(rerequestOnAccessTokenFailure, action);
    }),
    takeEvery(ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE, function* (action) {
      console.log('[authSaga] RECEIVE_ACCESS_TOKEN_FAILURE triggered:', action);
      yield call(invalidateInvalidAuth, action);
    }),
    takeEvery(ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE, function* (action) {
      console.log('[authSaga] RECEIVE_DEGRADED_INFO_RESPONSE -> doAuthWorkflow:', action);
      yield call(doAuthWorkflow, { infoJson: action.infoJson, windowId: action.windowId });
    }),
    takeEvery(ActionTypes.RECEIVE_INFO_RESPONSE, function* (action) {
      console.log('[authSaga] RECEIVE_INFO_RESPONSE (regular success) - checking for auth services:', action);
      // Check if successful response has auth services that should trigger workflow
      if (action.infoJson && Utils.getServices(action.infoJson).some(s => 
        (s.getProperty && s.getProperty('type') === 'AuthProbeService2') ||
        (s.getProperty && s.getProperty('type') === 'AuthAccessService2')
      )) {
        console.log('[authSaga] SUCCESS response has auth services - triggering workflow');
        yield call(doAuthWorkflow, { infoJson: action.infoJson, windowId: action.windowId });
      }
    }),
    takeEvery(ActionTypes.RECEIVE_ACCESS_TOKEN, function* (action) {
      console.log('[authSaga] RECEIVE_ACCESS_TOKEN triggered:', action);
      yield call(refetchInfoResponses, action);
    }),
    takeEvery(ActionTypes.RECEIVE_ACCESS_TOKEN, function* (action) {
      console.log('[authSaga] RECEIVE_ACCESS_TOKEN -> refetchProbeResponses:', action);
      yield call(refetchProbeResponses, action);
    }),
    takeEvery(ActionTypes.RESET_AUTHENTICATION_STATE, function* (action) {
      console.log('[authSaga] RESET_AUTHENTICATION_STATE -> refetchInfoResponsesOnLogout:', action);
      yield call(refetchInfoResponsesOnLogout, action);
    }),
    takeEvery(ActionTypes.RESET_AUTHENTICATION_STATE, function* (action) {
      console.log('[authSaga] RESET_AUTHENTICATION_STATE -> refetchProbeResponsesOnLogout:', action);
      yield call(refetchProbeResponsesOnLogout, action);
    }),
  ]);
}
