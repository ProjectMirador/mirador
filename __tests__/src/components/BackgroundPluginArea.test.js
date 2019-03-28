import React from 'react';
import { shallow } from 'enzyme';
import { BackgroundPluginArea } from '../../../src/components/BackgroundPluginArea';

it('should render outer element correctly', () => {
  const wrapper = shallow(<BackgroundPluginArea />);
  expect(wrapper.find('.mirador-background-plugin-area').length).toBe(1);
});

it('should render plugin components', () => {
  /** */
  const PluginComponentA = props => <div>A</div>;
  /** */
  const PluginComponentB = props => <div>B</div>;

  const wrapper = shallow(
    <BackgroundPluginArea
      PluginComponents={[PluginComponentA, PluginComponentB]}
    />,
  );

  expect(wrapper.find(PluginComponentA).length).toBe(1);
  expect(wrapper.find(PluginComponentB).length).toBe(1);
});
