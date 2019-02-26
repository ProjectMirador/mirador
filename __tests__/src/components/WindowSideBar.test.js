import React from 'react';
import { shallow } from 'enzyme';
import { WindowSideBar } from '../../../src/components/WindowSideBar';

describe('WindowSideBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WindowSideBar windowId="1" classes={{}} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Drawer)').length).toBe(2);
    expect(wrapper.find('WithStyles(List)').length).toBe(1);
  });
});
