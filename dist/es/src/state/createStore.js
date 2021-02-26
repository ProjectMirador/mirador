function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
/**
 * Configure Store
 */

export default function (pluginReducers) {
  var pluginSagas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var miradorReducer = createRootReducer(pluginReducers);
  var rootReducer = settings.state.slice ? combineReducers(_defineProperty({}, settings.state.slice, miradorReducer)) : miradorReducer; // create the saga middleware

  var sagaMiddleware = createSagaMiddleware();
  var store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware))); // then run the saga

  sagaMiddleware.run(getRootSaga(pluginSagas));
  return store;
}