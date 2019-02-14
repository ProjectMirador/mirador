import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceAdd from '../../../src/components/WorkspaceAdd';
import fixture from '../../fixtures/version-2/002.json';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WorkspaceAdd
      setWorkspaceAddVisibility={() => {}}
      manifests={{ foo: fixture, bar: fixture }}
      classes={{}}
      t={str => str}
      {...props}
    />,
  ).dive();
}

describe('WorkspaceAddButton', () => {
  it('renders a list item for each manifest in the state', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('Connect(LoadNamespace(WithStyles(ManifestListItem)))').length).toBe(2);
  });

  it('toggles the workspace visibility', () => {
    const setWorkspaceAddVisibility = jest.fn();
    const wrapper = createWrapper({ setWorkspaceAddVisibility });

    wrapper.find('Connect(LoadNamespace(WithStyles(ManifestListItem)))').first().props().handleClose();
    expect(setWorkspaceAddVisibility).toHaveBeenCalledWith(false);
  });

  it('has a button to add new resources', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('WithStyles(Fab)').length).toBe(1);
    wrapper.find('WithStyles(Fab)').simulate('click');
    expect(wrapper.state().addResourcesOpen).toBe(true);
    expect(wrapper.find('WithStyles(Fab)').props().disabled).toBe(true);
  });

  it('has a toggle-able drawer to add new resources', () => {
    const wrapper = createWrapper();
    wrapper.setState({ addResourcesOpen: true });

    expect(wrapper.find('WithStyles(Drawer)').props().open).toBe(true);
    expect(wrapper.find('WithStyles(Drawer) WithStyles(Typography)').dive().dive().text()).toBe('addResource');

    wrapper.find('WithStyles(Drawer) WithStyles(AppBar)').simulate('click');
    expect(wrapper.find('WithStyles(Drawer)').props().open).toBe(false);
  });

  it('passes a cancel action through to the form', () => {
    const wrapper = createWrapper();
    wrapper.setState({ addResourcesOpen: true });

    expect(wrapper.find('WithStyles(Drawer) Connect(LoadNamespace(ManifestForm))').length).toBe(1);
    wrapper.find('WithStyles(Drawer) Connect(LoadNamespace(ManifestForm))').props().onCancel();
    expect(wrapper.find('WithStyles(Drawer)').props().open).toBe(false);
  });
});
