import {
  filterValidPlugins,
  connectPluginsToStore,
  addPluginReducersToStore,
  createTargetToPluginMapping,
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
        name: 'invalid Plugin 1',
      },
      {
        name: 'invalid Plugin 2',
      },
    ];
    const result = filterValidPlugins(plugins);
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('valid plugin 1');
    expect(result[1].name).toBe('valid plugin 2');
  });
});

describe('createTargetToPluginMapping', () => {
  it('returns empty object if plugin array is empty', () => {
    expect(createTargetToPluginMapping([])).toEqual({});
  });

  it('should create a mapping from targets to plugins and modes', () => {
    /** */
    const component = props => null;

    const plugins = [
      { component, mode: 'wrap', target: 'Window' },
      { component, mode: 'wrap', target: 'Window' },
      { component, mode: 'add', target: 'Window' },
      { component, mode: 'add', target: 'Window' },

      { component, mode: 'wrap', target: 'TopBar' },
      { component, mode: 'wrap', target: 'TopBar' },
      { component, mode: 'add', target: 'TopBar' },
      { component, mode: 'add', target: 'TopBar' },
    ];

    expect(createTargetToPluginMapping(plugins)).toEqual({
      TopBar: {
        add: [
          { component, mode: 'add', target: 'TopBar' },
          { component, mode: 'add', target: 'TopBar' },
        ],
        wrap: [
          { component, mode: 'wrap', target: 'TopBar' },
          { component, mode: 'wrap', target: 'TopBar' },
        ],
      },
      Window: {
        add: [
          { component, mode: 'add', target: 'Window' },
          { component, mode: 'add', target: 'Window' },
        ],
        wrap: [
          { component, mode: 'wrap', target: 'Window' },
          { component, mode: 'wrap', target: 'Window' },
        ],
      },
    });
  });
});

describe('connectPluginsToStore', () => {
  it('returns empty array if plugin array is empty', () => {
    expect(filterValidPlugins([])).toEqual([]);
  });

  it('returns plugins with components connected to store', () => {
    /** */
    const ComponentA = props => null;
    /** */
    const ComponentB = props => null;

    const plugins = [
      { component: ComponentA, mode: 'wrap', target: 'Window' },
      { component: ComponentB, mode: 'add', target: 'TopBar' },
    ];

    const result = connectPluginsToStore(plugins);
    expect(result.length).toBe(2);
    expect(result[0].component.displayName).toBe('Connect(ComponentA)');
    expect(result[1].component.displayName).toBe('Connect(ComponentB)');
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
