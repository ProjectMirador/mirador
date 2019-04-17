import React from 'react';
import { shallow } from 'enzyme';
import { BackgroundPluginArea } from '../../../src/components/BackgroundPluginArea';
import { PluginHook } from '../../../src/components/PluginHook';

it('renders the component', () => {
  const wrapper = shallow(<BackgroundPluginArea />);
  expect(wrapper.find('.mirador-background-plugin-area').length).toBe(1);
  expect(wrapper.find(PluginHook).length).toBe(1);
});
