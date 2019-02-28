import { combineReducers } from 'redux';
import {
  errorsReducer,
  companionWindowsReducer,
  configReducer,
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
    errors: errorsReducer,
    companionWindows: companionWindowsReducer,
    workspace: workspaceReducer,
    windows: windowsReducer,
    manifests: manifestsReducer,
    infoResponses: infoResponsesReducer,
    config: configReducer,
    viewers: viewersReducer,
    annotations: annotationsReducer,
    ...pluginReducers,
  });
}
