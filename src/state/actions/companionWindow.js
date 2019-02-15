import uuid from 'uuid/v4';
import ActionTypes from './action-types';

/**
 * addCompanionWindow - action creator
 *
 * @param  {Object} options
 * @memberof ActionCreators
 */
export function addCompanionWindow(companionWindow) {
  return {
    type: ActionTypes.SET_COMPANION_WINDOW,
    id: `cw-${uuid()}`,
    ...companionWindow,
  };
}

/**
 * removeCompanionWindow - action creator
 *
 * @param  {Object} options
 * @memberof ActionCreators
 */
export function removeCompanionWindow(id, windowId) {
  return {
    type: ActionTypes.REMOVE_COMPANION_WINDOW,
    id,
    windowId,
  };
}
