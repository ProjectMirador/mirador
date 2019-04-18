import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceImport } from '../../../src/components/WorkspaceImport';

describe('WorkspaceImport', () => {
  let wrapper;
  let handleClose;
  let mockState;

  beforeEach(() => {
    handleClose = jest.fn();
    mockState = {
      configImportValue: {},
    };

    wrapper = shallow(
      <WorkspaceImport
        open
        handleClose={handleClose}
        state={mockState}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Dialog)').length).toBe(1);
  });
});
