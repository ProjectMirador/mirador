import ActionTypes from './action-types';
import { getProbeService } from '../../lib/getServices';

/**
 * requestProbeResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function requestProbeResponse(probeId, resource, windowId) {
  return {
    probeId,
    resource,
    type: ActionTypes.REQUEST_PROBE_RESPONSE,
    windowId,
  };
}

/**
 * receiveProbeResponse - action creator
 *
 * @param  {String} infoId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */
export function receiveProbeResponse(probeId, probeJson, ok, tokenServiceId) {
  return {
    ok,
    probeId,
    probeJson,
    tokenServiceId,
    type: ActionTypes.RECEIVE_PROBE_RESPONSE,
  };
}

/**
 * receiveDegradedProbeResponse - action creator
 *
 * @param  {String} infoId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */
export function receiveDegradedProbeResponse(probeId, probeJson, ok, tokenServiceId, windowId) {
  return {
    ok,
    probeId,
    probeJson,
    tokenServiceId,
    type: ActionTypes.RECEIVE_DEGRADED_PROBE_RESPONSE,
    windowId,
  };
}

/**
 * receiveProbeResponseFailure - action creator
 *
 * @param  {String} infoId
 * @param  {String} error
 * @memberof ActionCreators
 */
export function receiveProbeResponseFailure(probeId, error, tokenServiceId) {
  return {
    error,
    probeId,
    tokenServiceId,
    type: ActionTypes.RECEIVE_PROBE_RESPONSE_FAILURE,
  };
}

/**
 * fetchProbeResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function fetchProbeResponse({ resource, resourceId, windowId }) {
  const probeService = resource && getProbeService(resource);
  const probeId = (resourceId || probeService.id);
  return requestProbeResponse(probeId, resource, windowId);
}

/**
 * removeProbeResponse - action creator
 *
 * @param  {String} probeId
 * @memberof ActionCreators
 */
export function removeProbeResponse(probeId) {
  return { probeId, type: ActionTypes.REMOVE_PROBE_RESPONSE };
}
