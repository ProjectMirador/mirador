import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from '@material-ui/core/MenuItem';
import WorkspaceExport from '../../../src/containers/WorkspaceExport';
import WorkspaceImport from '../../../src/containers/WorkspaceImport';
import { WorkspaceOptionsMenu } from '../../../src/components/WorkspaceOptionsMenu';

/** Utility helper to create a shallow wrapper around WorkspaceOptionsButton */
function createShallow(props) {
  return shallow(
    <WorkspaceOptionsMenu
      containerId="mirador"
      handleClose={() => {}}
      t={k => k}
      {...props}
    />,
  );
}

describe('WorkspaceOptionsMenu', () => {
  let wrapper;

  it('toggles the relevant section with each MenuItem click', () => {
    wrapper = createShallow();

    expect(wrapper.find(MenuItem).length).toEqual(2);
    expect(wrapper.find(WorkspaceExport).length).toEqual(0);
    expect(wrapper.find(WorkspaceImport).length).toEqual(0);

    wrapper.find(MenuItem).at(0).simulate('click');
    expect(wrapper.find(WorkspaceExport).length).toEqual(1);
    wrapper.find(MenuItem).at(1).simulate('click');
    expect(wrapper.find(WorkspaceImport).length).toEqual(1);
  });

  it('it passes a handleClose prop to the various components to that closes that will close the component', () => {
    wrapper.setState({ exportWorkspace: { open: true } });
    expect(wrapper.state().exportWorkspace.open).toBe(true);
    wrapper.find(WorkspaceExport).props().handleClose();
    expect(wrapper.state().exportWorkspace.open).toBe(false);
  });
});
