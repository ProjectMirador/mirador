"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _redux = require("redux");

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _rootReducer = _interopRequireDefault(require("./reducers/rootReducer"));

var _sagas = _interopRequireDefault(require("./sagas"));

var _settings = _interopRequireDefault(require("../config/settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Configure Store
 */
function _default(pluginReducers) {
  var pluginSagas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var miradorReducer = (0, _rootReducer["default"])(pluginReducers);
  var rootReducer = _settings["default"].state.slice ? (0, _redux.combineReducers)(_defineProperty({}, _settings["default"].state.slice, miradorReducer)) : miradorReducer; // create the saga middleware

  var sagaMiddleware = (0, _reduxSaga["default"])();
  var store = (0, _redux.createStore)(rootReducer, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk["default"], sagaMiddleware))); // then run the saga

  sagaMiddleware.run((0, _sagas["default"])(pluginSagas));
  return store;
}