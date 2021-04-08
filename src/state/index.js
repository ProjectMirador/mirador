import * as actions from './actions';
import * as reducers from './reducers';
import * as sagas from './sagas';
import * as selectors from './selectors';
import createStore from './createStore';

const exports = {
  actions,
  createStore,
  reducers,
  sagas,
  selectors,
};

export default exports;
