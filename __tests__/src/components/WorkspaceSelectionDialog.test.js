import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceSelectionDialog } from '../../../src/components/WorkspaceSelectionDialog';
import settings from '../../../src/config/settings';

describe('WorkspaceSettings', () => {
  let wrapper;
  let handleClose;
  let updateConfig;

  beforeEach(() => {
    handleClose = jest.fn();
    updateConfig = jest.fn();

    wrapper = shallow(
      <WorkspaceSelectionDialog
        open
        handleClose={handleClose}
        updateConfig={updateConfig}
        workspaceType={settings.theme}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Dialog)').length).toBe(1);
    expect(wrapper.find('WithStyles(FormControl)').length).toBe(1);
  });
  it('calls updateConfig when selected', () => {
    wrapper.instance().handleWorkspaceChange({ target: { value: 'foo' } });
    expect(updateConfig).toHaveBeenCalled();
  });
  it('renders the current workspace type', () => {
    wrapper.find.handleWorkspaceChange({ target: { value: 'foo' } });
    expect(updateConfig).toHaveBeenCalled();
  });
});
