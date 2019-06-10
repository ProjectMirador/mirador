import React from 'react';
import { shallow } from 'enzyme';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { WorkspaceMenu } from '../../../src/components/WorkspaceMenu';

/** */
function createShallow(props) {
  return shallow(
    <WorkspaceMenu
      containerId="mirador"
      showThemePicker
      {...props}
    />,
  );
}

describe('WorkspaceMenu', () => {
  let wrapper;
  let handleClose;
  const showZoomControls = false;
  let toggleZoomControls;

  beforeEach(() => {
    handleClose = jest.fn();
    toggleZoomControls = jest.fn();
    wrapper = createShallow({ handleClose, showZoomControls, toggleZoomControls });
  });

  it('renders without an error', () => {
    expect(wrapper.find(Menu).length).toBe(1);
  });

  it('closes the current menu when opening a submenu', () => {
    wrapper.find(MenuItem).first().simulate('click', {});
    expect(handleClose).toBeCalled();
  });

  it('disables zoom controls if the workspaceAdd UI is visible', () => {
    expect(wrapper.find(MenuItem).at(0).props().disabled).toBe(false);

    wrapper = createShallow({
      handleClose, isWorkspaceAddVisible: true, showZoomControls, toggleZoomControls,
    });

    expect(wrapper.find(MenuItem).at(0).props().disabled).toBe(true);
  });

  describe('handleZoomToggleClick', () => {
    it('resets the anchor state', () => {
      wrapper.instance().handleZoomToggleClick();
      expect(toggleZoomControls).toBeCalledWith(true);
    });
  });
});
