import { combineReducers } from 'redux';
import workspaceReducer from './workspace';
import windowsReducer from './windows';
import manifestsReducer from './manifests';

/**
 * Action Creators for Mirador
 * @namespace RootReducer
 */

const rootReducer = combineReducers({
  workspace: workspaceReducer,
  windows: windowsReducer,
  manifests: manifestsReducer,
});

export default rootReducer;
