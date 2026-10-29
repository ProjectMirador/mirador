import { all, call, put, select, takeEvery, delay } from 'redux-saga/effects';
import { Utils } from 'manifesto.js';
import ActionTypes from '../actions/action-types';
import { addAuthenticationRequest, resolveAuthenticationRequest, requestAccessToken, resetAuthenticationState } from '../actions';
import { getConfig, getAuth, getAccessTokens } from '../selectors';
import { iiifApi } from '../api/iiifApi';

/** */
export function* refetchInfoResponsesOnLogout({ tokenServiceId }) {
  // delay logout actions to give the cookie service a chance to invalidate our cookies
  // before we reinitialize openseadragon and rerequest images.

  yield delay(2000);
  yield call(refetchInfoResponses, { serviceId: tokenServiceId });
}

/**
 * Refetch every info response that named this token service, now that it
 * has a (new/refreshed) token. getInfoResponse's providesTags already tags
 * each cached response by every token service it names (success) or the
 * degraded service it hit (error), so this is the one-line replacement for
 * the old manual walk-every-window/every-canvas/every-cached-response logic
 * -- the old version also relied on fetchInfoResponse/selectInfoResponses'
 * legacy shape, both gone now.
 */
export function* refetchInfoResponses({ serviceId }) {
  yield put(iiifApi.util.invalidateTags([{ id: serviceId, type: 'TokenService' }]));
}

/** try to start any non-interactive auth flows */
export function* doAuthWorkflow({ infoJson, windowId }) {
  const auths = yield select(getAuth);
  const { auth: { serviceProfiles = [] } = {} } = yield select(getConfig);
  const nonInteractiveAuthFlowProfiles = serviceProfiles.filter((p) => p.external || p.kiosk);

  // try to get an untried, non-interactive auth service
  const authService = Utils.getServices(infoJson)
    .filter((s) => !auths[s.id])
    .find((e) => nonInteractiveAuthFlowProfiles.some((p) => p.profile === e.getProfile()));
  if (!authService) return;

  const profileConfig = nonInteractiveAuthFlowProfiles.find((p) => p.profile === authService.getProfile());

  if (profileConfig.kiosk) {
    // start the auth
    yield put(addAuthenticationRequest(windowId, authService.id, authService.getProfile()));
  } else if (profileConfig.external) {
    const tokenService =
      Utils.getService(authService, 'http://iiif.io/api/auth/1/token') ||
      Utils.getService(authService, 'http://iiif.io/api/auth/0/token');

    if (!tokenService) return;
    // start the auth
    yield put(addAuthenticationRequest(windowId, authService.id, authService.getProfile()));
    // resolve the auth
    yield put(resolveAuthenticationRequest(authService.id, tokenService.id, { ok: true }));
    // start access tokens
    yield put(requestAccessToken(tokenService.id, authService.id));
  }
}

/** */
export function* rerequestOnAccessTokenFailure({ infoJson, windowId, tokenServiceId }) {
  if (!tokenServiceId) return;

  // make sure we have an auth service to try
  const authService = Utils.getServices(infoJson).find((service) => {
    const tokenService =
      Utils.getService(service, 'http://iiif.io/api/auth/1/token') ||
      Utils.getService(service, 'http://iiif.io/api/auth/0/token');

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
    takeEvery(ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE, invalidateInvalidAuth),
    takeEvery(ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE, doAuthWorkflow),
    takeEvery(ActionTypes.RECEIVE_ACCESS_TOKEN, refetchInfoResponses),
    takeEvery(ActionTypes.RESET_AUTHENTICATION_STATE, refetchInfoResponsesOnLogout),
  ]);
}
