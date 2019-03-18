import React from 'react';
import { shallow } from 'enzyme';
import Drawer from '@material-ui/core/Drawer';
import WindowSideBarButtons from '../../../src/containers/WindowSideBarButtons';
import { WindowSideBar } from '../../../src/components/WindowSideBar';

describe('WindowSideBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WindowSideBar windowId="1" classes={{}} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find(Drawer).length).toBe(1);
    expect(wrapper.find(WindowSideBarButtons).length).toBe(1);
  });
});
