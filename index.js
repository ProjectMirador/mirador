import { createStore } from 'redux';
// import { actions } from './actions';

const initialState = {
  currentCanvas: 0
}

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */

function stateCore(state = initialState, action) {
  switch (action.type) {
  case 'INCREMENT':
    console.log('incremented');
    return Object.assign(state,{
      currentCanvas: state.currentCanvas + 1
    });
  case 'DECREMENT':
    console.log('decrement');
    return Object.assign(state,{
      currentCanvas: state.currentCanvas - 1
    });
  default:
    return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export const store = createStore(stateCore);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

// store.subscribe(() =>
//   console.log(store.getState())
// )
