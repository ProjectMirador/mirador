// Topics for understanding
// redux modules for nested stores
// state normalisation
// (normalizer library)

import { createStore } from 'redux';
import { rootReducer } from './reducers/index';
import * as ActionCreators from './actions';
// import * as Actions from './actions';

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export const store = createStore(rootReducer);

export const actions = ActionCreators;

/*
 * You can use subscribe() to update the UI in response to state changes.
 * Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
 * However it can also be handy to persist the current state in the localStorage.
 */

store.subscribe(() => console.log('Current state:', store.getState()));
