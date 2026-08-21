// Topics for understanding
// redux modules for nested stores
// state normalisation
// migration from legacy Redux to React Toolkit (RTK)

import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import createRootReducer from './reducers/rootReducer';
import getRootSaga from './sagas';
import settings from '../config/settings';

/**
 * Configure Mirador Store
 *
 * Exported as the default (see src/state/index.js, which re-exports it as `createStore`)
 */
function createStore(pluginReducers, pluginSagas = []) {
  const miradorReducer = createRootReducer(pluginReducers);

  // RTK's configureStore calls combineReducers when given a reducer map
  const reducer = settings.state.slice ? { [settings.state.slice]: miradorReducer } : miradorReducer;

  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // RTK's default middleware includes redux-thunk; devTools is on by default
  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // `imageResource` carries a manifesto.js-wrapped resource instance
          // directly on REQUEST_INFO_RESPONSE
          // This keeps compatibility with any external consumer of that documented ActionTypes entry
          // `config` is included here too since IMPORT_MIRADOR_STATE's
          // action payload carries a full `state.config` snapshot.
          ignoredActionPaths: ['imageResource', /(^|\.)config$/],
          // config is Mirador's plugin/host config API surface -- it
          // legitimately carries functions by design (MUI theme
          // styleOverrides, config.export.manifests.filter, etc.). Matched by
          // suffix so this still applies when settings.state.slice nests
          // everything under an extra top-level key.
          ignoredPaths: [/(^|\.)config$/],
        },
      }).concat(sagaMiddleware),
    reducer,
  });

  // then run the saga
  sagaMiddleware.run(getRootSaga(pluginSagas));

  return store;
}

export default createStore;
