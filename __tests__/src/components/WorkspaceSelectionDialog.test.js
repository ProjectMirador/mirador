import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceSelectionDialog } from '../../../src/components/WorkspaceSelectionDialog';

describe('WorkspaceSettings', () => {
  let wrapper;
  let handleClose;
  let updateConfig;

  /**
   * create wrapper
   * @param {*} props additional properties
   */
  function createWrapper(props) {
    handleClose = jest.fn();
    updateConfig = jest.fn();

    return shallow(
      <WorkspaceSelectionDialog
        classes={{ list: {} }}
        open
        handleClose={handleClose}
        updateConfig={updateConfig}
        workspaceType="elastic"
        {...props}
      />,
    );
  }

  it('renders without an error', () => {
    wrapper = createWrapper();
    expect(wrapper.matchesElement('WithStyles(WorkspaceSelectionDialog)'));
  });

  it('sends the updateConfig and handleClose props on workspace selection', () => {
    wrapper = createWrapper();

    wrapper.find('WithStyles(MenuItem)').at(0).simulate('click');
    expect(updateConfig).toHaveBeenLastCalledWith({ workspace: { type: 'elastic' } });
    wrapper.find('WithStyles(MenuItem)').at(1).simulate('click');
    expect(updateConfig).toHaveBeenLastCalledWith({ workspace: { type: 'mosaic' } });
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

      wrapper.find('WithStyles(Dialog)').props().onEntered(mockMenu);
      expect(mockMenuItemFocus).toHaveBeenCalled();
    });
  });
});
