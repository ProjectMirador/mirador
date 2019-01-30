import React from 'react';
import { shallow } from 'enzyme';
import WindowTopMenuButton from '../../../src/components/WindowTopMenuButton';

describe('WindowTopMenuButton', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <WindowTopMenuButton classes={{}} windowId="xyz" />,
    ).dive();
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(IconButton)').length).toBe(1);
  });
  it('when clicked, updates the state', () => {
    wrapper.find('WithStyles(IconButton)').simulate('click', { currentTarget: 'x' });
    expect(wrapper.find('Connect(miradorWithPlugins(WithStyles(WindowTopMenu)))').props().anchorEl).toBe('x');
  });
});
