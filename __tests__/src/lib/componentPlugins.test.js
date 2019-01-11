import componentPlugins from '../../../src/lib/componentPlugins';

describe('componentPlugins', () => {
  const originalMirador = window.Mirador;
  beforeAll(() => {
    window.Mirador = {
      plugins: {
        fooPlugin: {
          name: 'fooPlugin',
          parent: 'FooComponent',
        },
        barPlugin: {
          name: 'barPlugin',
          parent: 'FooComponent',
        },
      },
    };
  });
  afterAll(() => {
    window.Mirador = originalMirador;
  });
  it('only selects plugins that are defined in config', () => {
    expect(componentPlugins('FooComponent', ['barPlugin'])[0].name).toEqual('barPlugin');
    expect(componentPlugins('FooComponent', ['barPlugin']).length).toEqual(1);
  });
  it('only selects plugins that define component as parent', () => {
    expect(componentPlugins('BarComponent', ['barPlugin'])).toEqual([]);
    expect(componentPlugins('FooComponent', ['fooPlugin']).length).toEqual(1);
  });
});
