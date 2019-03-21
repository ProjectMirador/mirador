import { combineReducers } from 'redux';
import {
  accessTokensReducer,
  authReducer,
  companionWindowsReducer,
  configReducer,
  elasticLayoutReducer,
  errorsReducer,
  infoResponsesReducer,
  manifestsReducer,
  viewersReducer,
  windowsReducer,
  rangesReducer,
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
    accessTokens: accessTokensReducer,
    annotations: annotationsReducer,
    auth: authReducer,
    companionWindows: companionWindowsReducer,
    config: configReducer,
    elasticLayout: elasticLayoutReducer,
    errors: errorsReducer,
    infoResponses: infoResponsesReducer,
    manifests: manifestsReducer,
    ranges: rangesReducer,
    viewers: viewersReducer,
    windows: windowsReducer,
    workspace: workspaceReducer,
    ...pluginReducers,
  });
}
