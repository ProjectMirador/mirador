import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import WindowTopMenuButton from '../../../src/containers/WindowTopMenuButton';
import WindowTopBarPluginArea from '../../../src/containers/WindowTopBarPluginArea';
import WindowTopBarPluginMenu from '../../../src/containers/WindowTopBarPluginMenu';
import WindowTopBarTitle from '../../../src/containers/WindowTopBarTitle';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import FullScreenButton from '../../../src/containers/FullScreenButton';
import { WindowTopBar } from '../../../src/components/WindowTopBar';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowTopBar
      windowId="xyz"
      classes={{}}
      t={str => str}
      maximizeWindow={() => {}}
      maximized={false}
      minimizeWindow={() => {}}
      removeWindow={() => {}}
      toggleWindowSideBar={() => {}}
      {...props}
    />,
  );
}

describe('WindowTopBar', () => {
  it('renders all default components', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(AppBar).length).toBe(1);
    expect(wrapper.find(Toolbar).length).toBe(1);
    expect(wrapper.find(MiradorMenuButton).length).toBe(3);
    expect(wrapper.find(WindowTopBarTitle).length).toBe(1);
    expect(wrapper.find(WindowTopBarPluginArea).length).toBe(1);
    expect(wrapper.find(WindowTopBarPluginMenu).length).toBe(1);
    expect(wrapper.find(WindowTopMenuButton).length).toBe(1);
    expect(wrapper.find(FullScreenButton).length).toBe(0);
  });

  it('triggers window focus when clicked', () => {
    const focusWindow = jest.fn();
    const wrapper = createWrapper({ focusWindow });
    wrapper.find(Toolbar).simulate('mouseDown');
    expect(focusWindow).toHaveBeenCalled();
  });

  it('passes correct props to <IconButton/>', () => {
    const toggleWindowSideBar = jest.fn();
    const wrapper = createWrapper({ toggleWindowSideBar });
    expect(wrapper.find(MiradorMenuButton).first().props().onClick).toBe(toggleWindowSideBar);
  });

  it('passes correct props to <WindowTopBarButtons/>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(WindowTopBarPluginMenu).first().props().windowId).toBe('xyz');
  });

  it('passe correct props to <WindowTopMenuButton', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(WindowTopMenuButton).first().props().windowId).toBe('xyz');
  });

  it('passes correct props to <Button/>', () => {
    const removeWindow = jest.fn();
    const wrapper = createWrapper({ removeWindow });
    expect(wrapper.find(MiradorMenuButton).last().props().onClick).toBe(removeWindow);
  });

  it('passes correct props to <Button/>', () => {
    const maximizeWindow = jest.fn();
    const wrapper = createWrapper({ maximizeWindow });
    expect(wrapper.find(MiradorMenuButton).at(1).props().onClick).toBe(maximizeWindow);
  });

  it('close button is configurable', () => {
    expect(createWrapper({ allowClose: false }).find('.mirador-window-close').length).toEqual(0);
  });

  it('maximize button is configurable', () => {
    expect(createWrapper({ allowMaximize: false }).find('.mirador-window-maximize').length).toEqual(0);
  });

  it('fullscreen button is configurable', () => {
    expect(createWrapper({ allowFullscreen: true }).find(FullScreenButton).length).toEqual(1);
  });
});
