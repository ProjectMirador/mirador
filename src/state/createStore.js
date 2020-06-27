// Topics for understanding
// redux modules for nested stores
// state normalisation
// (normalizer library)

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers/rootReducer';
import getRootSaga from './sagas';
import settings from '../config/settings';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

/**
 * Configure Store
 */
export default function (pluginReducers, pluginSagas = []) {
  const miradorReducer = createRootReducer(pluginReducers);

  const rootReducer = settings.state.slice
    ? combineReducers({ [settings.state.slice]: miradorReducer })
    : miradorReducer;

  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware, sagaMiddleware,
      ),
    ),
  );

  // then run the saga
  sagaMiddleware.run(getRootSaga(pluginSagas));

  return store;
}
