import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from '../../src/state/reducers/rootReducer';
import WindowContext from '../../src/contexts/WindowContext';

const rootReducer = createRootReducer();

/**
 * Hook up our rendered object to redux
 */
function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createStore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware)),
    windowId,
    ...renderOptions
  } = {},
) {
  const windowContext = windowId ? { id: windowId } : {};

  /** :nodoc: */
  function Wrapper({ children }) {
    return (
      <WindowContext.Provider value={windowContext}>
        <Provider store={store}>{children}</Provider>
      </WindowContext.Provider>
    );
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const rendered = render(ui, { wrapper: Wrapper, ...renderOptions });

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...rendered,
    rerender: (newUi, options) => render(newUi, { container: rendered.container, wrapper: Wrapper, ...options }),
  };
}

export * from '@testing-library/react';
export { renderWithProviders as render };
