import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
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
    expect(wrapper.find(Dialog).length).toBe(1);
  });
  it('renders sizing props', () => {
    expect(wrapper.find(Dialog).props()).toEqual(expect.objectContaining({
      fullWidth: true,
      maxWidth: 'sm',
    }));
  });
  it('renders TextField props', () => {
    expect(wrapper.find(TextField).props()).toEqual(expect.objectContaining({
      inputProps: { autoFocus: 'autofocus' },
    }));
  });
});
