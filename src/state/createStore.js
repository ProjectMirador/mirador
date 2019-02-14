// Topics for understanding
// redux modules for nested stores
// state normalisation
// (normalizer library)

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers/rootReducer';


/**
 * Configure Store
 */
export default function () {
  const store = createStore(
    createRootReducer(),
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
  store.pluginReducers = {};
  return store;
}
