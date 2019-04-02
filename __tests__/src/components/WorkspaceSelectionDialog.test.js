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
        classes={{ listItem: {} }}
        open
        handleClose={handleClose}
        updateConfig={updateConfig}
        workspaceType="elastic"
        {...props}
      />,
    );
  }

  beforeEach(() => {

  });

  /**
   * Assert which list item is selected
   */
  function assertItemFocused(list, itemIndex) {
    const items = list.find('WithStyles(ListItem)');

    items.forEach((item, index) => {
      if (index === itemIndex) {
        expect(item.prop('selected')).toBe(true);
      }
    });
  }

  it('renders without an error', () => {
    wrapper = createWrapper();
    expect(wrapper.find('WithStyles(Dialog)').length).toBe(1);
    expect(wrapper.find('WithStyles(List)').length).toBe(1);
  });

  it('calls updateConfig updating the workspace type when selected', () => {
    wrapper = createWrapper();
    wrapper.find('WithStyles(ListItem)').first().simulate('click');
    expect(updateConfig).toHaveBeenCalledWith({ workspace: { type: 'elastic' } });
  });

  describe('handleKeyUp', () => {
    it('the elastic list item is selected when corresponding workspaceType is passed', () => {
      wrapper = createWrapper();
      assertItemFocused(wrapper, 0);
    });

    it('the mosaic list item is selected when corresponding workspaceType is passed', () => {
      wrapper = createWrapper({ workspaceType: 'mosaic' });
      assertItemFocused(wrapper, 1);
    });

    it('the next item is selected when pressing the down arrow', () => {
      wrapper = createWrapper();
      wrapper.find('WithStyles(Dialog)').simulate('keyDown', { key: 'ArrowDown', preventDefault: () => {} });
      assertItemFocused(wrapper, 1);
    });

    it('the previous item is selected when pressing the up arrow', () => {
      wrapper = createWrapper({ workspaceType: 'mosaic' });
      wrapper.find('WithStyles(Dialog)').simulate('keyDown', { key: 'ArrowUp', preventDefault: () => {} });
      assertItemFocused(wrapper, 0);
    });

    it('first item is selected when pressing the down arrow from the last item', () => {
      wrapper = createWrapper({ workspaceType: 'mosaic' });
      wrapper.find('WithStyles(Dialog)').simulate('keyDown', { key: 'ArrowDown', preventDefault: () => {} });
      assertItemFocused(wrapper, 0);
    });

    it('last item is selected when pressing the up arrow from the first item', () => {
      wrapper = createWrapper();
      wrapper.find('WithStyles(Dialog)').simulate('keyDown', { key: 'ArrowUp', preventDefault: () => {} });
      assertItemFocused(wrapper, 1);
    });

    it('uppateConfig handler is called when pressing the enter key', () => {
      wrapper = createWrapper();
      wrapper.find('WithStyles(Dialog)').simulate('KeyDown', { key: 'Enter', preventDefault: () => {} });
      expect(updateConfig).toHaveBeenCalledWith({ workspace: { type: 'elastic' } });
    });
  });
});
