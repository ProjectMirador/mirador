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
    const plugins = [
      { mode: 'wrap', target: 'Window' },
      { mode: 'wrap', target: 'Window' },
      { mode: 'add', target: 'Window' },
      { mode: 'add', target: 'Window' },

      { mode: 'wrap', target: 'TopBar' },
      { mode: 'wrap', target: 'TopBar' },
      { mode: 'add', target: 'TopBar' },
      { mode: 'add', target: 'TopBar' },
    ];

    pluginStore.storePlugins(plugins);

    expect(pluginStore.getPlugins('Window')).toEqual({
      add: [
        { mode: 'add', target: 'Window' },
        { mode: 'add', target: 'Window' },
      ],
      wrap: [
        { mode: 'wrap', target: 'Window' },
        { mode: 'wrap', target: 'Window' },
      ],
    });

    expect(pluginStore.getPlugins('TopBar')).toEqual({
      add: [
        { mode: 'add', target: 'TopBar' },
        { mode: 'add', target: 'TopBar' },
      ],
      wrap: [
        { mode: 'wrap', target: 'TopBar' },
        { mode: 'wrap', target: 'TopBar' },
      ],
    });
  });
});
