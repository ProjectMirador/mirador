import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from '../../src/state/reducers/rootReducer';

const rootReducer = createRootReducer();

/**
 * Hook up our rendered object to redux
 */
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createStore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware)),
    ...renderOptions
  } = {},
) {
  /** :nodoc: */
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
