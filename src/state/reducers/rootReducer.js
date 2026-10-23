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
  workspaceReducer,
  searchesReducer,
  layersReducer,
  catalogReducer,
} from '.';
import { iiifApi } from '../api/iiifApi';

/**
 * Function to create root reducer
 * from plugin reducers.
 * @namespace CreateRootReducer
 */
export default function createRootReducer(pluginReducers) {
  return combineReducers({
    accessTokens: accessTokensReducer,
    auth: authReducer,
    catalog: catalogReducer,
    companionWindows: companionWindowsReducer,
    config: configReducer,
    elasticLayout: elasticLayoutReducer,
    errors: errorsReducer,
    [iiifApi.reducerPath]: iiifApi.reducer,
    infoResponses: infoResponsesReducer,
    layers: layersReducer,
    manifests: manifestsReducer,
    searches: searchesReducer,
    viewers: viewersReducer,
    windows: windowsReducer,
    workspace: workspaceReducer,
    ...pluginReducers,
  });
}
