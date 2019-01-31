import createStore from './state/createStore';
import * as actions from './state/actions';

const store = createStore();
export default { store, actions };
