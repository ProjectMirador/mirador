import {
  filterValidPlugins,
  addPluginReducersToStore,
} from '../../../src/extend/pluginPreprocessing';

describe('filterValidPlugins', () => {
  it('returns empty array if plugin array is empty', () => {
    expect(filterValidPlugins([])).toEqual([]);
  });

  it('returns only valid plugins', () => {
    const plugins = [
      {
        component: props => null,
        mode: 'add',
        name: 'valid plugin 1',
        target: 'Window',
      },
      {
        component: props => null,
        mode: 'wrap',
        name: 'valid plugin 2',
        target: 'Window',
      },
      {
        mode: 'wrap',
        name: 'invalid Plugin 1',
      },
      {
        name: 'invalid Plugin 2',
        target: 'missing-mode',
      },
    ];
    const result = filterValidPlugins(plugins);
    expect(result.map(r => r.name)).toEqual(['valid plugin 1', 'valid plugin 2']);
  });
});

describe('addPluginReducersToStore', () => {
  const store = { replaceReducer: jest.fn() };
  const createRootReducer = jest.fn(pluginReducers => pluginReducers);

  /** */ const fooReducer = x => x;
  /** */ const barReducer = x => x;
  /** */ const bazReducer = x => x;

  const plugins = [
    {
      component: props => null,
      mode: 'add',
      reducers: {
        bar: barReducer,
        foo: fooReducer,
      },
      target: 'Window',
    },
    {
      component: props => null,
      mode: 'add',
      reducers: {
        baz: bazReducer,
      },
      target: 'Window',
    },
  ];

  addPluginReducersToStore(store, createRootReducer, plugins);
  expect(store.replaceReducer.mock.calls.length).toBe(1);
  expect(store.replaceReducer.mock.calls[0][0]).toEqual({
    bar: barReducer,
    baz: bazReducer,
    foo: fooReducer,
  });
});
