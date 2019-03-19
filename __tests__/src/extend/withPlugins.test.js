import React from 'react';
import { shallow } from 'enzyme';
import { withPlugins } from '../../../src/extend';
import { pluginStore } from '../../../src/extend/pluginStore';


jest.mock('../../../src/extend/pluginStore');

/** */
const Target = props => <div>Hello</div>;

/** create wrapper  */
function createPluginHoc(plugins) {
  pluginStore.getPlugins = () => plugins;
  const props = { foo: 1, bar: 2 };
  const PluginHoc = withPlugins('Target', Target);
  return shallow(<PluginHoc {...props} />);
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
    const hoc = createPluginHoc([]);
    expect(hoc.find(Target).length).toBe(1);
    expect(hoc.find(Target).props().foo).toBe(1);
    expect(hoc.find(Target).props().bar).toBe(2);
  });
});

describe('PluginHoc: if a delete-plugin exists for the target', () => {
  it('renders nothing', () => {
    const plugins = {
      delete: [
        { target: 'Target', mode: 'delete' },
      ],
      replace: [
        { target: 'Target', mode: 'replace' },
      ],
      wrap: [
        { target: 'Target', mode: 'wrap' },
      ],
      add: [
        { target: 'Target', mode: 'add' },
      ],
    };

    const hoc = createPluginHoc(plugins);
    expect(hoc.find('*').length).toBe(0);
  });
});

describe('PluginHoc: if replace-plugins exists but no delete-plugin', () => {
  it('renders the first replace-plugin component', () => {
    /** */ const ReplacePluginComponentA = props => <div>look i am a plugin</div>;
    /** */ const ReplacePluginComponentB = props => <div>look i am a plugin</div>;
    /** */ const WrapPluginComponent = props => <div>look i am a plugin</div>;
    /** */ const AddPluginComponent = props => <div>look i am a plugin</div>;
    const plugins = {
      replace: [
        { target: 'Target', mode: 'replace', component: ReplacePluginComponentA },
        { target: 'Target', mode: 'replace', component: ReplacePluginComponentB },
      ],
      wrap: [
        { target: 'Target', mode: 'wrap', component: WrapPluginComponent },
      ],
      add: [
        { target: 'Target', mode: 'add', component: AddPluginComponent },
      ],
    };
    const hoc = createPluginHoc(plugins);
    const selector = 'Connect(ReplacePluginComponentA)';
    expect(hoc.find(selector).length).toBe(1);
    expect(hoc.find(selector).props().foo).toBe(1);
    expect(hoc.find(selector).props().bar).toBe(2);
  });
});

describe('PluginHoc: if wrap-plugins exists but no delete-plugin, no replace-plugin and no add-plugins', () => {
  it('renders the first wrap-plugin and passes the target component as prop', () => {
    /** */ const WrapPluginComponentA = props => <div>look i am a plugin</div>;
    /** */ const WrapPluginComponentB = props => <div>look i am a plugin</div>;
    const plugins = {
      wrap: [
        { target: 'Target', mode: 'wrap', component: WrapPluginComponentA },
        { target: 'Target', mode: 'wrap', component: WrapPluginComponentB },
      ],
    };
    const hoc = createPluginHoc(plugins);
    const selector = 'Connect(WrapPluginComponentA)';
    expect(hoc.find(selector).length).toBe(1);
    expect(hoc.find(selector).props().foo).toBe(1);
    expect(hoc.find(selector).props().bar).toBe(2);
    expect(hoc.find(selector).props().TargetComponent).toBe(Target);
  });
});

describe('PluginHoc: if add-plugins exist but no delete-plugin, no replace-plugin and no wrap-plugin', () => {
  it('renders the target component and passes all add-plugin components as a prop', () => {
    /** */ const AddPluginComponentA = props => <div>look i am a plugin</div>;
    /** */ const AddPluginComponentB = props => <div>look i am a plugin</div>;
    const plugins = {
      add: [
        { target: 'Target', mode: 'add', component: AddPluginComponentA },
        { target: 'Target', mode: 'add', component: AddPluginComponentB },
      ],
    };
    const hoc = createPluginHoc(plugins);
    const selector = Target;
    expect(hoc.find(selector).length).toBe(1);
    expect(hoc.find(selector).props().foo).toBe(1);
    expect(hoc.find(selector).props().bar).toBe(2);
    expect(hoc.find(selector).props().PluginComponents[0].displayName)
      .toBe('Connect(AddPluginComponentA)');
    expect(hoc.find(selector).props().PluginComponents[1].displayName)
      .toBe('Connect(AddPluginComponentB)');
  });
});

describe('PluginHoc: if add-plugins AND wrap-plugins exist but no delete-plugin and no replace-plugin', () => {
  it('passes all add-plugin components to target component and renders the first wrap-plugin with the target component as prop', () => {
    /** */ const WrapPluginComponentA = props => <div>look i am a plugin</div>;
    /** */ const WrapPluginComponentB = props => <div>look i am a plugin</div>;
    /** */ const AddPluginComponentA = props => <div>look i am a plugin</div>;
    /** */ const AddPluginComponentB = props => <div>look i am a plugin</div>;
    const plugins = {
      add: [
        { target: 'Target', mode: 'add', component: AddPluginComponentA },
        { target: 'Target', mode: 'add', component: AddPluginComponentB },
      ],
      wrap: [
        { target: 'Target', mode: 'wrap', component: WrapPluginComponentA },
        { target: 'Target', mode: 'wrap', component: WrapPluginComponentB },
      ],
    };
    const hoc = createPluginHoc(plugins);
    const selector = 'Connect(WrapPluginComponentA)';
    expect(hoc.find(selector).length).toBe(1);
    expect(hoc.find(selector).props().foo).toBe(1);
    expect(hoc.find(selector).props().bar).toBe(2);

    const { TargetComponent } = hoc.find(selector).props();
    const target = shallow(<TargetComponent bubu={10} kiki={20} />);
    expect(target.props().bubu).toBe(10);
    expect(target.props().kiki).toBe(20);
    expect(target.props().PluginComponents[0].displayName)
      .toBe('Connect(AddPluginComponentA)');
    expect(target.props().PluginComponents[1].displayName)
      .toBe('Connect(AddPluginComponentB)');
  });
});
