import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceExport } from '../../../src/components/WorkspaceExport';

describe('WorkspaceExport', () => {
  let wrapper;
  let handleClose;

  beforeEach(() => {
    handleClose = jest.fn();

    wrapper = shallow(
      <WorkspaceExport
        open
        handleClose={handleClose}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Dialog)').length).toBe(1);
  });
});
