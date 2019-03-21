import ActionTypes from './action-types';

/**
 * setConfig - action creator
 *
 * @param  {Object} config
* @memberof ActionCreators
 */
export function setConfig(config) {
  return { config, type: ActionTypes.SET_CONFIG };
}

/**
 * updateConfig - action creator
 *
 * @param  {Object} config
* @memberof ActionCreators
 */
export function updateConfig(config) {
  return { config, type: ActionTypes.UPDATE_CONFIG };
}
