import React from 'react';
import { shallow } from 'enzyme';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import WindowList from '../../../src/containers/WindowList';
import { WindowListButton } from '../../../src/components/WindowListButton';

/**
 * Helper function to create a shallow wrapper around WindowListButton
 */
function createWrapper(props) {
  return shallow(
    <WindowListButton
      t={str => str}
      windowCount={3}
      {...props}
    />,
  );
}

describe('WindowListButton', () => {
  let wrapper;

  it('passes the windowCount as BadgeProps to MiradorMenuButton', () => {
    wrapper = createWrapper();

    expect(wrapper.find(MiradorMenuButton).props().BadgeProps.badgeContent).toEqual(3);
  });

  it('disabled the MiradorMenuButton if the disabled prop is true', () => {
    wrapper = createWrapper({ disabled: true });

    expect(wrapper.find(MiradorMenuButton).props().disabled).toBe(true);
  });

  it('toggles the WindowList comonent when clicking on the MiradorMenuButton', () => {
    wrapper = createWrapper();
    expect(wrapper.find(WindowList).length).toBe(0);
    wrapper.find(MiradorMenuButton).simulate('click', { currentTarget: 'blah' });
    expect(wrapper.find(WindowList).length).toBe(1);
  });
});
