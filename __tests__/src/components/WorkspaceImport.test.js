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
  it('renders sizing props', () => {
    expect(wrapper.find('WithStyles(Dialog)').props()).toEqual(expect.objectContaining({
      fullWidth: true,
      maxWidth: 'sm',
    }));
  });
  it('renders TextField props', () => {
    expect(wrapper.find('TextField').props()).toEqual(expect.objectContaining({
      inputProps: { autofocus: 'autofocus' },
    }));
  });
});
