import ActionTypes from './action-types';

/**
 * importConfig - action creator
 *
 * @param  {Object} config
 * @memberof ActionCreators
 */
export function importConfig(config) {
  return { type: ActionTypes.IMPORT_CONFIG, config };
}

/**
 * setConfig - action creator
 *
 * @param  {Object} config
 * @memberof ActionCreators
 */
export function setConfig(config) {
  return { type: ActionTypes.SET_CONFIG, config };
}

/**
 * updateConfig - action creator
 *
 * @param  {Object} config
 * @memberof ActionCreators
 */
export function updateConfig(config) {
  return { type: ActionTypes.UPDATE_CONFIG, config };
}
