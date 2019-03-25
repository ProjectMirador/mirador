import React from 'react';
import { shallow } from 'enzyme';
import { withPlugins } from '../../../src/extend';
import { pluginStore } from '../../../src/extend/pluginStore';


jest.mock('../../../src/extend/pluginStore');

/** */
const Target = props => <div>Hello</div>;

/** create wrapper  */
function createWrapper(plugins) {
  pluginStore.getPlugins = () => plugins;
  const props = {
    bar: 2,
    foo: 1,
  };
  const PluginWrapper = withPlugins('Target', Target);
  return shallow(<PluginWrapper {...props} />);
}

describe('withPlugins', () => {
  it('should return a function (normal function call)', () => {
    expect(withPlugins('Target', Target)).toBeInstanceOf(Function);
  });

  it('should return a function (curry function call)', () => {
    expect(withPlugins('Target')(Target)).toBeInstanceOf(Function);
  });

  it('displayName prop of returned function is based on target name argument', () => {
    expect(withPlugins('Bubu', Target).displayName)
      .toBe('WithPlugins(Bubu)');
  });
});

describe('PluginHoc: if no plugin exists for the target', () => {
  it('renders the target component', () => {
    const wrapper = createWrapper([]);
    expect(wrapper.find(Target).length).toBe(1);
    expect(wrapper.find(Target).props().foo).toBe(1);
    expect(wrapper.find(Target).props().bar).toBe(2);
  });
});

describe('PluginHoc: if a wrap plugin extists for the target', () => {
  it('renders the plugin component and passes the target component as a prop', () => {
    /** */
    const PluginComponent = props => <div>look i am a plugin</div>;
    const plugin = {
      component: PluginComponent,
      mode: 'wrap',
      target: 'Target',
    };
    const wrapper = createWrapper([plugin]);
    const selector = 'Connect(PluginComponent)';
    expect(wrapper.find(selector).length).toBe(1);
    expect(wrapper.find(selector).props().foo).toBe(1);
    expect(wrapper.find(selector).props().bar).toBe(2);
    expect(wrapper.find(selector).props().TargetComponent)
      .toBe(Target);
  });
});

describe('PluginHoc: if a add plugin exists for the target', () => {
  it('renders the target component and passes the plugin component as a prop', () => {
    /** */
    const PluginComponent = props => <div>look i am a plugin</div>;
    const plugin = {
      component: PluginComponent,
      mode: 'add',
      target: 'Target',
    };
    const wrapper = createWrapper([plugin]);
    expect(wrapper.find(Target).length).toBe(1);
    expect(wrapper.find(Target).props().foo).toBe(1);
    expect(wrapper.find(Target).props().bar).toBe(2);
    expect(wrapper.find(Target).props().PluginComponent.WrappedComponent)
      .toBe(PluginComponent);
  });
});
