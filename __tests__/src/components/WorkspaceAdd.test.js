import React from 'react';
import { shallow } from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { WorkspaceAdd } from '../../../src/components/WorkspaceAdd';
import ManifestListItem from '../../../src/containers/ManifestListItem';
import ManifestForm from '../../../src/containers/ManifestForm';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WorkspaceAdd
      setWorkspaceAddVisibility={() => {}}
      catalog={[
        { manifestId: 'bar' },
        { manifestId: 'foo' },
      ]}
      classes={{}}
      t={str => str}
      {...props}
    />,
  );
}

describe('WorkspaceAdd', () => {
  it('renders a list item for each manifest in the state', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(ManifestListItem).length).toBe(2);
  });

  it('without manifests, renders an empty message', () => {
    const wrapper = createWrapper({ catalog: [] });
    expect(wrapper.find(ManifestListItem).length).toEqual(0);
    expect(wrapper.find(Typography).first().children().text()).toEqual('emptyResourceList');
  });

  it('toggles the workspace visibility', () => {
    const setWorkspaceAddVisibility = jest.fn();
    const wrapper = createWrapper({ setWorkspaceAddVisibility });

    wrapper.find(ManifestListItem).first().props().handleClose();
    expect(setWorkspaceAddVisibility).toHaveBeenCalledWith(false);
  });

  it('has a button to add new resources', () => {
    const wrapper = createWrapper();

    expect(wrapper.find(Fab).length).toBe(1);
    wrapper.find(Fab).simulate('click');
    expect(wrapper.state().addResourcesOpen).toBe(true);
    expect(wrapper.find(Fab).props().disabled).toBe(true);
  });

  it('has a toggle-able drawer to add new resources', () => {
    const wrapper = createWrapper();
    wrapper.setState({ addResourcesOpen: true });

    expect(wrapper.find(Drawer).props().open).toBe(true);
    expect(wrapper.find(Drawer).find(Typography).dive().dive()
      .text()).toBe('addResource');

    wrapper.find(Drawer).find(AppBar).simulate('click');
    expect(wrapper.find(Drawer).find(Typography).props().open).not.toBe(true);
  });

  it('passes a submit action through to the form', () => {
    const wrapper = createWrapper();
    wrapper.setState({ addResourcesOpen: true });

    expect(wrapper.find(Drawer).find(ManifestForm).length).toBe(1);
    wrapper.find(Drawer).find(ManifestForm).props().onSubmit();
    expect(wrapper.find(Drawer).props().open).toBe(false);
  });

  it('passes a cancel action through to the form', () => {
    const wrapper = createWrapper();
    wrapper.setState({ addResourcesOpen: true });

    expect(wrapper.find(Drawer).find(ManifestForm).length).toBe(1);
    wrapper.find(Drawer).find(ManifestForm).props().onCancel();
    expect(wrapper.find(Drawer).props().open).toBe(false);
  });
});
