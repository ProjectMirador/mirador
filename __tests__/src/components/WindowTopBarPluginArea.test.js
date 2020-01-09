import React from 'react';
import { shallow } from 'enzyme';
import { WindowTopBarPluginArea } from '../../../src/components/WindowTopBarPluginArea';
import { PluginHook } from '../../../src/components/PluginHook';

it('renders the component', () => {
  const wrapper = shallow(<WindowTopBarPluginArea />);
  expect(wrapper.find(PluginHook).length).toBe(1);
});
