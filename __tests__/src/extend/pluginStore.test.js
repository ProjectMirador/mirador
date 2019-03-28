import { pluginStore } from '../../../src/extend';

describe('storePlugins()', () => {
  it('should run without throw error when Array is passed', () => {
    expect(() => pluginStore.storePlugins([])).not.toThrow();
  });
  it('should run without throw error when nothing is passed', () => {
    expect(() => pluginStore.storePlugins()).not.toThrow();
  });
});

describe('getPlugins', () => {
  it('returns undefined if no plugin for target exist', () => {
    pluginStore.storePlugins();
    expect(pluginStore.getPlugins('target')).not.toBeDefined();
  });
  it('returns mode->plugins mapping for target', () => {
    /** */
    const component = x => x;

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

    pluginStore.storePlugins(plugins);

    expect(pluginStore.getPlugins('Window')).toEqual({
      add: [
        { component, mode: 'add', target: 'Window' },
        { component, mode: 'add', target: 'Window' },
      ],
      wrap: [
        { component, mode: 'wrap', target: 'Window' },
        { component, mode: 'wrap', target: 'Window' },
      ],
    });

    expect(pluginStore.getPlugins('TopBar')).toEqual({
      add: [
        { component, mode: 'add', target: 'TopBar' },
        { component, mode: 'add', target: 'TopBar' },
      ],
      wrap: [
        { component, mode: 'wrap', target: 'TopBar' },
        { component, mode: 'wrap', target: 'TopBar' },
      ],
    });
  });
});
