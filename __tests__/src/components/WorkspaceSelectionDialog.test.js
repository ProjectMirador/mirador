import React from 'react';
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
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
        workspaceType={settings.workspace.type}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Dialog)').length).toBe(1);
    expect(wrapper.find('WithStyles(FormControl)').length).toBe(1);
  });
  it('calls updateConfig updating the workspace type when selected', () => {
    wrapper.find(Select).props().onChange({ target: { value: 'foo' } });
    expect(updateConfig).toHaveBeenCalledWith({ workspace: { type: 'foo' } });
  });
  it('passes the current workspace type as the value prop to the Select', () => {
    expect(wrapper.find(Select).props().value).toEqual('mosaic');
  });
});
