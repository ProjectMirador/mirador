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
  annotationsReducer,
  searchesReducer,
  searchPointersReducer,
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
    annotations: annotationsReducer,
    auth: authReducer,
    catalog: catalogReducer,
    companionWindows: companionWindowsReducer,
    config: configReducer,
    elasticLayout: elasticLayoutReducer,
    errors: errorsReducer,
    infoResponses: infoResponsesReducer,
    [iiifApi.reducerPath]: iiifApi.reducer,
    layers: layersReducer,
    manifests: manifestsReducer,
    searches: searchesReducer,
    searchPointers: searchPointersReducer,
    viewers: viewersReducer,
    windows: windowsReducer,
    workspace: workspaceReducer,
    ...pluginReducers,
  });
}
