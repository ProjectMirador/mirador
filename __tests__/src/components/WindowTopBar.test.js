import React from 'react';
import { shallow } from 'enzyme';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import WindowTopMenuButton from '../../../src/containers/WindowTopMenuButton';
import WindowTopBarButtons from '../../../src/containers/WindowTopBarButtons';
import WindowIcon from '../../../src/containers/WindowIcon';
import WindowTopBar from '../../../src/components/WindowTopBar';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowTopBar
      manifestTitle="awesome manifest"
      windowId="xyz"
      classes={{}}
      t={str => str}
      removeWindow={() => {}}
      toggleWindowSideBar={() => {}}
      {...props}
    />,
  ).dive(); // unwrap HOC created by withStyles()
}

describe('WindowTopBar', () => {
  it('renders all needed elements', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(AppBar).length).toBe(1);
    expect(wrapper.find(Toolbar).length).toBe(1);
    expect(wrapper.find(IconButton).length).toBe(2);
    expect(wrapper.find(MenuIcon).length).toBe(1);
    expect(wrapper.find(WindowIcon).length).toBe(1);
    expect(wrapper.find(Typography).length).toBe(1);
    expect(wrapper.find(WindowTopBarButtons).length).toBe(1);
    expect(wrapper.find(WindowTopMenuButton).length).toBe(1);
  });

  it('passes correct props to <IconButton/>', () => {
    const toggleWindowSideBar = jest.fn();
    const wrapper = createWrapper({ toggleWindowSideBar });
    expect(wrapper.find(IconButton).first().props().onClick).toBe(toggleWindowSideBar);
  });

  it('passes correct props to <WindowIcon/>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(WindowIcon).first().props().windowId).toBe('xyz');
  });

  it('passes correct props to <Typography/>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(Typography).first().render().text()).toBe('awesome manifest');
  });

  it('passes correct props to <WindowTopBarButtons/>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(WindowTopBarButtons).first().props().windowId).toBe('xyz');
  });

  it('passe correct props to <WindowTopMenuButton', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(WindowTopMenuButton).first().props().windowId).toBe('xyz');
  });

  it('passes correct props to <Button/>', () => {
    const removeWindow = jest.fn();
    const wrapper = createWrapper({ removeWindow });
    expect(wrapper.find(IconButton).last().props().onClick).toBe(removeWindow);
  });
});
