import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceMenu } from '../../../src/components/WorkspaceMenu';

describe('WorkspaceMenu', () => {
  let wrapper;
  let handleClose;
  beforeEach(() => {
    handleClose = jest.fn();
    wrapper = shallow(<WorkspaceMenu handleClose={handleClose} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Menu)').length).toBe(1);
  });

  it('closes the current menu when opening a submenu', () => {
    wrapper.find('WithStyles(MenuItem)').first().simulate('click', {});
    expect(handleClose).toBeCalled();
  });

  describe('handleWindowListClick', () => {
    it('sets the anchor state', () => {
      wrapper.instance().handleWindowListClick({ currentTarget: true });

      expect(wrapper.find('Connect(WithStyles(WindowList))').props().open).toBe(true);
    });
  });

  describe('handleWindowListClose', () => {
    it('resets the anchor state', () => {
      wrapper.instance().handleWindowListClose();

      expect(wrapper.find('Connect(WithStyles(WindowList))').props().open).toBe(false);
    });
  });

  describe('handleSettingsClick', () => {
    it('sets the anchor state', () => {
      wrapper.instance().handleSettingsClick({ currentTarget: true });

      expect(wrapper.find('Connect(WithStyles(WorkspaceSettings))').props().open).toBe(true);
    });
  });

  describe('handleSettingsClose', () => {
    it('resets the anchor state', () => {
      wrapper.instance().handleSettingsClose();

      expect(wrapper.find('Connect(WithStyles(WorkspaceSettings))').props().open).toBe(false);
    });
  });

  describe('handleExportClick', () => {
    it('sets the anchor state', () => {
      wrapper.instance().handleExportClick({ currentTarget: true });

      expect(wrapper.find('Connect(WithStyles(WorkspaceExport))').props().open).toBe(true);
    });
  });

  describe('handleExportClose', () => {
    it('resets the anchor state', () => {
      wrapper.instance().handleExportClose();

      expect(wrapper.find('Connect(WithStyles(WorkspaceExport))').props().open).toBe(false);
    });
  });
});
