import {
  all, call, put, select, takeEvery, delay,
} from 'redux-saga/effects';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import flatten from 'lodash/flatten';
import ActionTypes from '../actions/action-types';
import MiradorCanvas from '../../lib/MiradorCanvas';
import {
  selectInfoResponses,
  getVisibleCanvases,
  getWindows,
} from '../selectors';
import { fetchInfoResponse } from './iiif';

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

  const canvases = yield all(
    Object.keys(windows).map(windowId => select(getVisibleCanvases, { windowId })),
  );

  const visibleImageApiIds = flatten(flatten(canvases).map((canvas) => {
    const miradorCanvas = new MiradorCanvas(canvas);
    return miradorCanvas.imageServiceIds;
  }));

  const infoResponses = yield select(selectInfoResponses);
  /** */
  const haveThisTokenService = infoResponse => {
    const services = Utils.getServices(infoResponse);
    return services.some(e => {
      const infoTokenService = Utils.getService(e, 'http://iiif.io/api/auth/1/token');
      return infoTokenService && infoTokenService.id === serviceId;
    });
  };

  const obsoleteInfoResponses = Object.values(infoResponses).filter(
    i => i.json && haveThisTokenService(i.json),
  );

  yield all(obsoleteInfoResponses.map(({ id: infoId }) => {
    if (visibleImageApiIds.includes(infoId)) {
      return call(fetchInfoResponse, { infoId });
    }
    return put({ infoId, type: ActionTypes.REMOVE_INFO_RESPONSE });
  }));
}

/** */
export default function* authSaga() {
  yield all([
    takeEvery(ActionTypes.RECEIVE_ACCESS_TOKEN, refetchInfoResponses),
    takeEvery(ActionTypes.RESET_AUTHENTICATION_STATE, refetchInfoResponsesOnLogout),
  ]);
}
