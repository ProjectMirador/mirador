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
  it('with no plugins should return undefined', () => {
    pluginStore.storePlugins();
    expect(pluginStore.getPlugins('target')).not.toBeDefined();
  });
  it('returns { mode -> plugin } mapping for target', () => {
    const plugins = [
      { mode: 'delete', target: 'Window' },
      { mode: 'delete', target: 'Window' },
      { mode: 'replace', target: 'Window' },
      { mode: 'replace', target: 'Window' },
      { mode: 'wrap', target: 'Window' },
      { mode: 'wrap', target: 'Window' },
      { mode: 'add', target: 'Window' },
      { mode: 'add', target: 'Window' },

      { mode: 'delete', target: 'TopBar' },
      { mode: 'delete', target: 'TopBar' },
      { mode: 'replace', target: 'TopBar' },
      { mode: 'replace', target: 'TopBar' },
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
      delete: [
        { mode: 'delete', target: 'Window' },
        { mode: 'delete', target: 'Window' },
      ],
      replace: [
        { mode: 'replace', target: 'Window' },
        { mode: 'replace', target: 'Window' },
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
      delete: [
        { mode: 'delete', target: 'TopBar' },
        { mode: 'delete', target: 'TopBar' },
      ],
      replace: [
        { mode: 'replace', target: 'TopBar' },
        { mode: 'replace', target: 'TopBar' },
      ],
      wrap: [
        { mode: 'wrap', target: 'TopBar' },
        { mode: 'wrap', target: 'TopBar' },
      ],
    });
  });
});
