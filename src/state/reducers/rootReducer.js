import { combineReducers } from 'redux';
import {
  configReducer,
  infoResponsesReducer,
  manifestsReducer,
  viewersReducer,
  windowsReducer,
  workspaceReducer,
} from '.';

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
    viewers: viewersReducer,
    ...pluginReducers,
  });
}
