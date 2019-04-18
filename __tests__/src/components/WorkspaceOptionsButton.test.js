import React from 'react';
import { shallow } from 'enzyme';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import WorkspaceOptionsMenu from '../../../src/containers/WorkspaceOptionsMenu';
import { WorkspaceOptionsButton } from '../../../src/components/WorkspaceOptionsButton';

/** Utility helper to create a shallow wrapper around WorkspaceOptionsButton */
function createShallow(props) {
  return shallow(
    <WorkspaceOptionsButton
      classes={{}}
      t={k => k}
      {...props}
    />,
  );
}

describe('WorkspaceOptionsButton', () => {
  let wrapper;

  it('renders a button and the menu', () => {
    wrapper = createShallow();

    expect(wrapper.find(MiradorMenuButton).length).toEqual(1);
    expect(wrapper.find(WorkspaceOptionsMenu).length).toEqual(1);
  });

  it('sets the anchorEl state (and passes that to the menu) on button click', () => {
    wrapper = createShallow();

    expect(wrapper.state().anchorEl).toBeNull();
    wrapper.find(MiradorMenuButton).simulate('click', { currentTarget: { id: 'blah' } });
    expect(wrapper.state().anchorEl).toEqual({ id: 'blah' });
  });

  it('sends a handleClose prop to the WorkspaceOptionsMenu that clears the anchorEl', () => {
    wrapper = createShallow();

    wrapper.setState({ anchorEl: { id: 'blah' } });
    expect(wrapper.state().anchorEl).toEqual({ id: 'blah' });

    wrapper.find(WorkspaceOptionsMenu).props().handleClose();
    expect(wrapper.state().anchorEl).toBeNull();
  });
});
