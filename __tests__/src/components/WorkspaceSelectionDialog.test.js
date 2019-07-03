import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import { WorkspaceSelectionDialog } from '../../../src/components/WorkspaceSelectionDialog';

describe('WorkspaceSettings', () => {
  let wrapper;
  let handleClose;
  let updateWorkspace;

  /**
   * create wrapper
   * @param {*} props additional properties
   */
  function createWrapper(props) {
    handleClose = jest.fn();
    updateWorkspace = jest.fn();

    return shallow(
      <WorkspaceSelectionDialog
        classes={{ list: {} }}
        open
        handleClose={handleClose}
        updateWorkspace={updateWorkspace}
        workspaceType="elastic"
        {...props}
      />,
    );
  }

  it('renders without an error', () => {
    wrapper = createWrapper();
    expect(wrapper.matchesElement(WorkspaceSelectionDialog));
  });

  it('sends the updateConfig and handleClose props on workspace selection', () => {
    wrapper = createWrapper();

    wrapper.find(MenuItem).at(0).simulate('click');
    expect(updateWorkspace).toHaveBeenLastCalledWith({ type: 'elastic' });
    wrapper.find(MenuItem).at(1).simulate('click');
    expect(updateWorkspace).toHaveBeenLastCalledWith({ type: 'mosaic' });
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  describe('inital focus', () => {
    const mockMenuItemFocus = jest.fn();
    const mockMenu = {
      querySelectorAll: (selector) => {
        expect(selector).toEqual('li[value="elastic"]');
        return [{ focus: mockMenuItemFocus }];
      },
    };

    it('sets an onEntered prop on the Dialog that focuses the selected item', () => {
      wrapper = createWrapper();

      wrapper.find(Dialog).props().onEntered(mockMenu);
      expect(mockMenuItemFocus).toHaveBeenCalled();
    });
  });
});
