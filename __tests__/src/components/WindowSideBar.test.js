import React from 'react';
import { shallow } from 'enzyme';
import Drawer from '@material-ui/core/Drawer';
import { WindowSideBar } from '../../../src/components/WindowSideBar';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowSideBar
      classes={{}}
      t={k => k}
      windowId="1"
      {...props}
    />,
  );
}

describe('WindowSideBar', () => {
  it('renders without an error', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(Drawer).length).toBe(1);
    expect(wrapper.find(Drawer).prop('open')).toBe(false);
  });
  it('renders in an open state', () => {
    const wrapper = createWrapper({ sideBarOpen: true });
    expect(wrapper.find(Drawer).length).toBe(1);
    expect(wrapper.find(Drawer).prop('open')).toBe(true);
  });
});
