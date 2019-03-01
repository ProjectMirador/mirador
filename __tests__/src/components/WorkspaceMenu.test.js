import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceMenu } from '../../../src/components/WorkspaceMenu';
import WindowList from '../../../src/containers/WindowList';

describe('WorkspaceMenu', () => {
  let wrapper;
  let handleClose;
  const showZoomControls = false;
  let toggleZoomControls;

  beforeEach(() => {
    handleClose = jest.fn();
    toggleZoomControls = jest.fn();
    wrapper = shallow(
      <WorkspaceMenu
        containerId="mirador"
        handleClose={handleClose}
        showZoomControls={showZoomControls}
        toggleZoomControls={toggleZoomControls}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Menu)').length).toBe(1);
  });

  it('closes the current menu when opening a submenu', () => {
    wrapper.find('WithStyles(MenuItem)').first().simulate('click', {});
    expect(handleClose).toBeCalled();
  });

  describe('handleMenuItemClick', () => {
    it('sets the anchor state', () => {
      wrapper.instance().handleMenuItemClick('windowList', { currentTarget: true });

      expect(wrapper.find(WindowList).props().open).toBe(true);
    });
  });

  describe('handleMenuItemClose', () => {
    it('resets the anchor state', () => {
      wrapper.instance().handleMenuItemClose('windowList')();
      expect(wrapper.find(WindowList).props().open).toBe(false);
    });
  });

  describe('handleZoomToggleClick', () => {
    it('resets the anchor state', () => {
      wrapper.instance().handleZoomToggleClick();
      expect(toggleZoomControls).toBeCalledWith(true);
    });
  });
});
