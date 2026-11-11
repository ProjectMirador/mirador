import { Provider } from 'react-redux';
import { render, screen, cleanup } from '@testing-library/react';
import PropTypes from 'prop-types';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import getRootSaga from '../../src/state/sagas';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';
import createRootReducer from '../../src/state/reducers/rootReducer';
import settings from '../../src/config/settings';
import createI18nInstance from '../../src/i18n';
import { failIfErrorDialogPresent, safeFindByRole, safeFindAllByRole } from './safe-queries';

/** Mirador viewer setup for Integration tests */
import { viewer as miradorViewer } from '../../src/index';

export * from '@testing-library/react';
export { renderWithProviders as render, safeFindByRole };

const rootReducer = createRootReducer();
const theme = createTheme(settings.theme);

const i18n = createI18nInstance();


/**
 * Helper to create a store with Mirador's reducer and saga middleware
 */
function createTestStore(preloadedState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: ['imageResource', /(^|\.)config$/],
          ignoredPaths: [/(^|\.)config$/],
        },
      }).concat(sagaMiddleware),
    preloadedState,
    reducer: rootReducer,
  });

  sagaMiddleware.run(getRootSaga());
  return store;
}

/**
 * Hook up our rendered object to redux
 */
function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {},
) {
  /** :nodoc: */
  function Wrapper({ children }) {
    return (
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </I18nextProvider>
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

/** adds a mirador viewer to the DOM */
const setupMiradorViewer = async (config, plugins) => {
  const viewer = miradorViewer({ ...config, id: undefined }, plugins);

  render(
    <div
      data-testid="mirador"
      style={{
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      }}
    >
      {viewer.render()}
    </div>,
  );

  // Return the instance so we can reference it
  return viewer;
};

/** */
export const setupIntegrationTestViewer = (config, plugins) => {
  beforeEach(async (context) => {
    const miradorInstance = await setupMiradorViewer(config, plugins);
    // eslint-disable-next-line no-param-reassign
    context.miradorInstance = miradorInstance;

    // Wait for the viewer to render
    expect(await screen.findByTestId('mirador')).toBeInTheDocument();
    expect(await screen.findByLabelText('Workspace')).toBeInTheDocument();

    await failIfErrorDialogPresent({ waitForRole: 'main' });

    if ((config.windows || []).length > 0) {
      await safeFindAllByRole('region', { name: /Window:/i });
    }
  });

  afterEach((context) => {
    cleanup();
    // If miradorInstance has a store or unmount method, tear it down here
    if (context.miradorInstance?.unmount) {
      context.miradorInstance.unmount();
    }
  });
};
