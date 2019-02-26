import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceFullScreenButton from '../../../src/containers/WorkspaceFullScreenButton';
import { WorkspaceControlPanelButtons }
  from '../../../src/components/WorkspaceControlPanelButtons';

describe('WorkspaceControlPanelButtons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WorkspaceControlPanelButtons />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(List)').length).toBe(1);
    expect(wrapper.find(WorkspaceFullScreenButton).length).toBe(1);
  });
});
