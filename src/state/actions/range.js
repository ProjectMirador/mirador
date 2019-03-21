import ActionTypes from './action-types';

/**
 * toggleRange - action creator
 *
 * @param  {String} windowId
 * @param  {String} rangeId
 * @memberof ActionCreators
 */
export function toggleRange(windowId, rangeId) {
  return (dispatch) => {
    dispatch({
      payload: {
        rangeId,
        windowId,
      },
      type: ActionTypes.TOGGLE_RANGE,
    });
  };
}
