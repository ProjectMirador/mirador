import ActionTypes from '../action-types';

/**
 * setZooming - action creator
 *
 * @param  {Object} payload
 * @memberof ActionCreators
 */
export default function setZooming(payload) {
  return { type: ActionTypes.SET_ZOOMING_FOR_VIEWER, payload };
}
