import { screen, render } from '@testing-library/react';
import { WorkspaceImport } from '../../../src/components/WorkspaceImport';

describe('WorkspaceImport', () => {
  let handleClose;
  let mockState;

  beforeEach(() => {
    handleClose = jest.fn();
    mockState = {
      configImportValue: {},
    };

    render(
      <WorkspaceImport
        open
        handleClose={handleClose}
        state={mockState}
      />,
    );
  });

  it('renders without an error', () => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  it('renders sizing props', () => {
    expect(screen.getByRole('dialog')).toHaveClass('MuiDialog-paperWidthSm');
  });
  it('renders TextField props', () => {
    expect(screen.getByRole('textbox')).toHaveFocus();
  });
});
