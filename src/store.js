// Topics for understanding
// redux modules for nested stores
// state normalisation
// (normalizer library)

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers/index';
import rootSaga from './sagas';

import * as ActionCreators from './actions';


const sagaMiddleware = createSagaMiddleware();

/**
 * Configure Store
 */
export function configureStore() {
  const store = createStore(
    createRootReducer(),
    composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware)),
  );
  store.pluginReducers = {};
  sagaMiddleware.run(rootSaga);
  return store;
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export const store = configureStore();
export const actions = ActionCreators;
export default { actions, store };
