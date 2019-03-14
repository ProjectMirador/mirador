import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import miradorViewer from '../../../src/lib/miradorViewer';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

jest.mock('react-redux', () => ({
  Provider: jest.fn(),
}));

const config = {
  id: 'mirador',
  windows: [
    {
      loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
      canvasIndex: 2,
    },
    {
      loadedManifest: 'https://iiif.bodleian.ox.ac.uk/iiif/manifest/e32a277e-91e2-4a6d-8ba6-cc4bad230410.json',
      thumbnailNavigationPosition: 'off',
      view: 'book',
    },
  ],
  manifests: {
    'https://media.nga.gov/public/manifests/nga_highlights.json': { provider: 'National Gallery of Art' },
    'https://data.ucd.ie/api/img/manifests/ucdlib:33064': { provider: 'Irish Architectural Archive' },
  },
};

const settings = {
  window: {
    defaultView: 'single',
  },
  thumbnailNavigation: {
    defaultPosition: 'bottom',
    height: 150,
    width: 100,
  },
};

/** */ const fooReducer = x => x;
/** */ const barReducer = x => x;
/** */ const bazReducer = x => x;

const plugins = [
  {
    reducers: {
      foo: fooReducer,
      bar: barReducer,
    },
  },
  {
    reducers: {
      baz: bazReducer,
    },
  },
];

const pluginStore = {
  storePlugins: jest.fn(),
};

const store = {
  dispatch: jest.fn(),
};

const createStore = jest.fn().mockReturnValue(store);

const actions = {
  setConfig: jest.fn().mockReturnValue('RETVAL_SET_CONFIG'),
  addWindow: jest.fn().mockReturnValue('RETVAL_ADD_WINDOW'),
  fetchManifest: jest.fn().mockReturnValue('RETVAL_FETCH_MANIFEST'),
  requestManifest: jest.fn().mockReturnValue('RETVAL_REQUEST_MANIFEST'),
};

/** */const App = props => null;

/**
* Finally invoke function under test
*/
const retval = miradorViewer({
  config,
  settings,
  plugins,
  pluginStore,
  createStore,
  actions,
  App,
});

it('should store plugins', () => {
  expect(pluginStore.storePlugins).toBeCalledWith(plugins);
});

it('should create store and pass plugin reducers', () => {
  const pluginReducers = {
    foo: fooReducer,
    bar: barReducer,
    baz: bazReducer,
  };
  expect(createStore).toBeCalledWith(pluginReducers);
});

it('should merge settings and config and write it to state', () => {
  const merged = deepmerge(settings, config);
  expect(actions.setConfig).toBeCalledWith(merged);
  expect(store.dispatch).nthCalledWith(1, 'RETVAL_SET_CONFIG');
});

it('should fetch manifest for each window in config', () => {
  expect(actions.fetchManifest)
    .toBeCalledWith(config.windows[0].loadedManifest);
  expect(actions.fetchManifest)
    .toBeCalledWith(config.windows[1].loadedManifest);
  expect(store.dispatch)
    .nthCalledWith(2, 'RETVAL_FETCH_MANIFEST');
  expect(store.dispatch)
    .nthCalledWith(4, 'RETVAL_FETCH_MANIFEST');
});

it('should create a window in state for each window in config', () => {
  expect(actions.addWindow).toBeCalledTimes(2);
  expect(store.dispatch).nthCalledWith(3, 'RETVAL_ADD_WINDOW');
  expect(store.dispatch).nthCalledWith(5, 'RETVAL_ADD_WINDOW');
});

it('should set correct canvas index to windows in state', () => {
  expect(actions.addWindow.mock.calls[0][0].canvasIndex).toBe(2);
  expect(actions.addWindow.mock.calls[1][0].canvasIndex).toBe(0);
});

it('should set correct manifest id to windows in state', () => {
  expect(actions.addWindow.mock.calls[0][0].manifestId)
    .toBe(config.windows[0].loadedManifest);
  expect(actions.addWindow.mock.calls[1][0].manifestId)
    .toBe(config.windows[1].loadedManifest);
});

it('should set correct thumbnail posistion to windows in state', () => {
  expect(actions.addWindow.mock.calls[0][0].thumbnailNavigationPosition)
    .toBe('bottom');
  expect(actions.addWindow.mock.calls[1][0].thumbnailNavigationPosition)
    .toBe('off');
});

it('should set correct view type to windows in state', () => {
  expect(actions.addWindow.mock.calls[0][0].view).toBe('single');
  expect(actions.addWindow.mock.calls[1][0].view).toBe('book');
});

it('should "request manifest" for each manifest in config', () => {
  expect(actions.requestManifest).nthCalledWith(
    1,
    'https://media.nga.gov/public/manifests/nga_highlights.json',
    { provider: 'National Gallery of Art' },
  );
  expect(actions.requestManifest).nthCalledWith(
    2,
    'https://data.ucd.ie/api/img/manifests/ucdlib:33064',
    { provider: 'Irish Architectural Archive' },
  );
  expect(store.dispatch).nthCalledWith(6, 'RETVAL_REQUEST_MANIFEST');
  expect(store.dispatch).nthCalledWith(7, 'RETVAL_REQUEST_MANIFEST');
});

it('should render app an provide it with the store', () => {
  const AppWithStore = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(ReactDOM.render.mock.calls[0][0]).toEqual(AppWithStore);
});

it('should return the store', () => {
  expect(retval).toEqual({ store, actions });
});
