import { combineReducers } from 'redux';
import {
  authReducer,
  companionWindowsReducer,
  configReducer,
  errorsReducer,
  infoResponsesReducer,
  manifestsReducer,
  viewersReducer,
  windowsReducer,
  workspaceReducer,
  annotationsReducer,
} from '.';

/**
 * Function to create root reducer
 * from plugin reducers.
 * @namespace CreateRootReducer
 */
export default function createRootReducer(pluginReducers) {
  return combineReducers({
    annotations: annotationsReducer,
    auth: authReducer,
    companionWindows: companionWindowsReducer,
    config: configReducer,
    errors: errorsReducer,
    infoResponses: infoResponsesReducer,
    manifests: manifestsReducer,
    viewers: viewersReducer,
    windows: windowsReducer,
    workspace: workspaceReducer,
    ...pluginReducers,
  });
}
