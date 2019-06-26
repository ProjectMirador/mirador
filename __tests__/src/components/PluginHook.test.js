import React from 'react';
import { shallow } from 'enzyme';
import { PluginHook } from '../../../src/components/PluginHook';

it('renders nothing when no plugins passed', () => {
  const wrapper = shallow(<PluginHook />);
  expect(wrapper).toEqual({});
});

/** */
const PluginComponentA = props => <div>A</div>;
/** */
const PluginComponentB = props => <div>B</div>;

it('renders plugin components if some passed', () => {
  const wrapper = shallow(
    <PluginHook
      PluginComponents={[PluginComponentA, PluginComponentB]}
    />,
  );

  expect(wrapper.find(PluginComponentA).length).toBe(1);
  expect(wrapper.find(PluginComponentB).length).toBe(1);
});

it('does not pass classes to PluginComponents (which will throw warnings for styles plugins)', () => {
  const wrapper = shallow(
    <PluginHook
      classes={{ someLocal: 'classes' }}
      PluginComponents={[PluginComponentA]}
    />,
  );

  expect(wrapper.find(PluginComponentA).props().classes).toBeUndefined();
});
