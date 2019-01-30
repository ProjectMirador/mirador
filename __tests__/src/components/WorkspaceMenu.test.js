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

  describe('handleMenuItemClick', () => {
    it('sets the anchor state', () => {
      wrapper.instance().handleMenuItemClick('windowList', { currentTarget: true });

      expect(wrapper.find('Connect(WithStyles(WindowList))').props().open).toBe(true);
    });
  });

  describe('handleMenuItemClose', () => {
    it('resets the anchor state', () => {
      wrapper.instance().handleMenuItemClose('windowList')();

      expect(wrapper.find('Connect(WithStyles(WindowList))').props().open).toBe(false);
    });
  });
});
