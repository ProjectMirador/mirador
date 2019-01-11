import { combineReducers } from 'redux';
import workspaceReducer from './workspace';
import windowsReducer from './windows';
import manifestsReducer from './manifests';
import infoResponsesReducer from './infoResponses';
import configReducer from './config';

/**
 * Function to create root reducer
 * from plugin reducers.
 * @namespace CreateRootReducer
 */
export default function createRootReducer(pluginReducers) {
  return combineReducers({
    workspace: workspaceReducer,
    windows: windowsReducer,
    manifests: manifestsReducer,
    infoResponses: infoResponsesReducer,
    config: configReducer,
    ...pluginReducers,
  });
}
