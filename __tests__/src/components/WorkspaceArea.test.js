import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceControlPanel from '../../../src/containers/WorkspaceControlPanel';
import Workspace from '../../../src/containers/Workspace';
import WorkspaceAdd from '../../../src/containers/WorkspaceAdd';
import { WorkspaceArea } from '../../../src/components/WorkspaceArea';
import i18n from '../../../src/i18n';

jest.unmock('react-i18next');

/** */
function createWrapper(props) {
  return shallow(
    <WorkspaceArea
      isWorkspaceControlPanelVisible
      setWorkspaceFullscreen={() => {}}
      classes={{}}
      t={k => k}
      {...props}
    />,
  );
}

describe('App', () => {
  it('should render outer element correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('main.mirador-viewer').length).toBe(1);
  });

  it('should render all needed elements ', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(Workspace).length).toBe(1);
    expect(wrapper.find(WorkspaceControlPanel).length).toBe(1);
  });

  it('should not render WorkspaceControlPanel when isWorkspaceControlPanelVisible is false', () => {
    const wrapper = createWrapper({ isWorkspaceControlPanelVisible: false });

    expect(wrapper.find(WorkspaceControlPanel).length).toBe(0);
  });

  describe('with isWorkspaceAddVisible', () => {
    const wrapper = createWrapper({ isWorkspaceAddVisible: true });

    expect(wrapper.find(Workspace).length).toBe(0);
    expect(wrapper.find(WorkspaceAdd).length).toBe(1);
  });
});
