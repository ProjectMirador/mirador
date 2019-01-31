import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceSettings from '../../../src/components/WorkspaceSettings';

describe('WorkspaceSettings', () => {
  let wrapper;
  let handleClose;

  beforeEach(() => {
    handleClose = jest.fn();

    wrapper = shallow(
      <WorkspaceSettings
        open
        handleClose={handleClose}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Dialog)').length).toBe(1);
  });
});
