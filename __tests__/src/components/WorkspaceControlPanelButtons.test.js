import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceAddButton from '../../../src/containers/WorkspaceAddButton';
import WorkspaceMenuButton from '../../../src/containers/WorkspaceMenuButton';
import WorkspaceFullScreenButton from '../../../src/containers/WorkspaceFullScreenButton';
import { WorkspaceControlPanelButtons }
  from '../../../src/components/WorkspaceControlPanelButtons';

describe('WorkspaceControlPanelButtons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WorkspaceControlPanelButtons />);
  });

  it('render all needed elements', () => {
    expect(wrapper.find(WorkspaceAddButton).length).toBe(1);
    expect(wrapper.find(WorkspaceMenuButton).length).toBe(1);
    expect(wrapper.find(WorkspaceFullScreenButton).length).toBe(1);
    expect(wrapper.find('PluginHook').length).toBe(1);
  });
});
