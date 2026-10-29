import ActionTypes from './action-types';

/**
 * receiveDegradedInfoResponse - action creator
 *
 * @param  {String} infoId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */
export function receiveDegradedInfoResponse(infoId, infoJson, ok, tokenServiceId, windowId) {
  return {
    infoId,
    infoJson,
    ok,
    tokenServiceId,
    type: ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE,
    windowId,
  };
}

/**
 * removeInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function removeInfoResponse(infoId) {
  return { infoId, type: ActionTypes.REMOVE_INFO_RESPONSE };
}
