import React from 'react';
import { shallow } from 'enzyme';
import { PluginHook } from '../../../src/components/PluginHook';

it('renders nothing when no plugins passed', () => {
  const wrapper = shallow(<PluginHook />);
  expect(wrapper).toEqual({});
});

it('renders plugin components if some passed', () => {
  /** */
  const PluginComponentA = props => <div>A</div>;
  /** */
  const PluginComponentB = props => <div>B</div>;

  const wrapper = shallow(
    <PluginHook
      PluginComponents={[PluginComponentA, PluginComponentB]}
    />,
  );
  expect(wrapper.find(PluginComponentA).length).toBe(1);
  expect(wrapper.find(PluginComponentB).length).toBe(1);
});
