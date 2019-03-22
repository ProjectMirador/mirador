import React from 'react';
import { shallow } from 'enzyme';
import { WindowPluginButtons } from '../../../src/components/WindowPluginButtons';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowPluginButtons
      windowId="xyz"
      t={key => key}
      {...props}
    />,
  );
}

it('renders nothing if no plugin component was passed', () => {
  const wrapper = createWrapper();
  expect(wrapper.find('*').length).toBe(0);
});

it('renders the plugin component if it was passed', () => {
  /** */
  const PluginComponent = props => <span>woooot!</span>;
  const wrapper = createWrapper({ PluginComponent });
  expect(wrapper.find(PluginComponent).length).toBe(1);
});

it('passes windowId to the plugin component', () => {
  /** */
  const PluginComponent = props => <span>woooot!</span>;
  const wrapper = createWrapper({ PluginComponent });
  expect(wrapper.find(PluginComponent).first().props().windowId).toBe('xyz');
});
