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
      { target: 'Window', mode: 'delete' },
      { target: 'Window', mode: 'delete' },
      { target: 'Window', mode: 'replace' },
      { target: 'Window', mode: 'replace' },
      { target: 'Window', mode: 'wrap' },
      { target: 'Window', mode: 'wrap' },
      { target: 'Window', mode: 'add' },
      { target: 'Window', mode: 'add' },

      { target: 'TopBar', mode: 'delete' },
      { target: 'TopBar', mode: 'delete' },
      { target: 'TopBar', mode: 'replace' },
      { target: 'TopBar', mode: 'replace' },
      { target: 'TopBar', mode: 'wrap' },
      { target: 'TopBar', mode: 'wrap' },
      { target: 'TopBar', mode: 'add' },
      { target: 'TopBar', mode: 'add' },
    ];

    pluginStore.storePlugins(plugins);

    expect(pluginStore.getPlugins('Window')).toEqual({
      delete: [
        { target: 'Window', mode: 'delete' },
        { target: 'Window', mode: 'delete' },
      ],
      replace: [
        { target: 'Window', mode: 'replace' },
        { target: 'Window', mode: 'replace' },
      ],
      wrap: [
        { target: 'Window', mode: 'wrap' },
        { target: 'Window', mode: 'wrap' },
      ],
      add: [
        { target: 'Window', mode: 'add' },
        { target: 'Window', mode: 'add' },
      ],
    });

    expect(pluginStore.getPlugins('TopBar')).toEqual({
      delete: [
        { target: 'TopBar', mode: 'delete' },
        { target: 'TopBar', mode: 'delete' },
      ],
      replace: [
        { target: 'TopBar', mode: 'replace' },
        { target: 'TopBar', mode: 'replace' },
      ],
      wrap: [
        { target: 'TopBar', mode: 'wrap' },
        { target: 'TopBar', mode: 'wrap' },
      ],
      add: [
        { target: 'TopBar', mode: 'add' },
        { target: 'TopBar', mode: 'add' },
      ],
    });
  });
});
