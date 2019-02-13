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
  );
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
});
