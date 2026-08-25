import { PluginReferences } from '../../../src/plugins/PluginReferences';

describe('PluginReferences', () => {
  afterEach(() => {
    PluginReferences.refs = {};
  });

  it('stores and retrieves a ref scoped by namespace and windowId', () => {
    const engine = { foo: 'bar' };
    PluginReferences.set('my-plugin', 'window-1', engine);

    expect(PluginReferences.get('my-plugin', 'window-1')).toBe(engine);
  });

  it('keeps different namespaces from colliding on the same windowId', () => {
    PluginReferences.set('plugin-a', 'window-1', 'a');
    PluginReferences.set('plugin-b', 'window-1', 'b');

    expect(PluginReferences.get('plugin-a', 'window-1')).toBe('a');
    expect(PluginReferences.get('plugin-b', 'window-1')).toBe('b');
  });

  it('returns undefined for an unknown namespace or windowId', () => {
    expect(PluginReferences.get('unknown', 'window-1')).toBeUndefined();

    PluginReferences.set('my-plugin', 'window-1', 'a');
    expect(PluginReferences.get('my-plugin', 'unknown-window')).toBeUndefined();
  });

  it('removes a ref without throwing when the namespace does not exist', () => {
    expect(() => PluginReferences.remove('unknown', 'window-1')).not.toThrow();

    PluginReferences.set('my-plugin', 'window-1', 'a');
    PluginReferences.remove('my-plugin', 'window-1');
    expect(PluginReferences.get('my-plugin', 'window-1')).toBeUndefined();
  });
});
