import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceMenuButton from '../../../src/containers/WorkspaceMenuButton';
import FullScreenButton from '../../../src/containers/FullScreenButton';
import { WorkspaceControlPanelButtons }
  from '../../../src/components/WorkspaceControlPanelButtons';

describe('WorkspaceControlPanelButtons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WorkspaceControlPanelButtons />);
  });

  it('render all needed elements', () => {
    expect(wrapper.find(WorkspaceMenuButton).length).toBe(1);
    expect(wrapper.find(FullScreenButton).length).toBe(1);
    expect(wrapper.find('PluginHook').length).toBe(1);
  });
});
