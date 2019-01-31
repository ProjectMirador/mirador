import React from 'react';
import { shallow } from 'enzyme';
import WindowSideBar from '../../../src/components/WindowSideBar';

describe('WindowSideBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WindowSideBar windowId="1" classes={{}} />).dive();
  });

  it('renders without an error', () => {
    expect(wrapper.find('.mirador-window-sidebar').length).toBe(1);
    expect(wrapper.find('WithStyles(List)').length).toBe(1);
  });
});
