import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceSelectionDialog } from '../../../src/components/WorkspaceSelectionDialog';

describe('WorkspaceSettings', () => {
  let wrapper;
  let handleClose;
  let updateConfig;

  beforeEach(() => {
    handleClose = jest.fn();
    updateConfig = jest.fn();

    wrapper = shallow(
      <WorkspaceSelectionDialog
        classes={{ listItem: {} }}
        open
        handleClose={handleClose}
        updateConfig={updateConfig}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Dialog)').length).toBe(1);
    expect(wrapper.find('WithStyles(List)').length).toBe(1);
  });

  it('calls updateConfig updating the workspace type when selected', () => {
    wrapper.find('WithStyles(ListItem)').first().simulate('click');
    expect(updateConfig).toHaveBeenCalledWith({ workspace: { type: 'elastic' } });
  });
});
