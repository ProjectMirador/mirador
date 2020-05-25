// Topics for understanding
// redux modules for nested stores
// state normalisation
// (normalizer library)

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers/rootReducer';
import getRootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

/**
 * Configure Store
 */
export default function (pluginReducers, pluginSagas = []) {
  const store = createStore(
    createRootReducer(pluginReducers),
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
