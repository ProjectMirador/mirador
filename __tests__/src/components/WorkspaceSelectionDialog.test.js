import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceSelectionDialog } from '../../../src/components/WorkspaceSelectionDialog';

describe('WorkspaceSettings', () => {
  let wrapper;
  let handleClose;
  let updateConfig;

  /**
   * create wrapper
   * @param {*} props additional properties
   */
  function createWrapper(props) {
    handleClose = jest.fn();
    updateConfig = jest.fn();

    return shallow(
      <WorkspaceSelectionDialog
        classes={{ list: {} }}
        open
        handleClose={handleClose}
        updateConfig={updateConfig}
        workspaceType="elastic"
        {...props}
      />,
    );
  }

  it('renders without an error', () => {
    wrapper = createWrapper();
    expect(wrapper.matchesElement('WithStyles(WorkspaceSelectionDialog)'));
  });
});
