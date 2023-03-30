import { screen, render } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { WorkspaceExport } from '../../../src/components/WorkspaceExport';

describe('WorkspaceExport', () => {
  let user;
  let handleClose = jest.fn();
  let mockState;

  beforeEach(() => {
    user = userEvent.setup();
    handleClose = jest.fn();
    mockState = {
      companionWindows: {},
      config: {},
      elasticLayout: {},
      viewers: {},
      windows: {},
      workspace: {},
    };

    render(
      <WorkspaceExport
        open
        handleClose={handleClose}
        exportableState={mockState}
      />,
    );
  });

  it('renders without an error', () => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders sizing props', () => {
    expect(screen.getByRole('dialog')).toHaveClass('MuiDialog-paperWidthSm');
  });

  it('is closable by clicking the cancel button', async () => {
    await user.click(screen.getByRole('button', { name: 'cancel' }));
    expect(handleClose).toHaveBeenCalled();
  });

  it('reveals a snackbar on copy', async () => {
    await user.click(screen.getByRole('button', { name: 'copy' }));
    expect(screen.getByRole('alert')).toHaveTextContent('exportCopied');

    await user.click(screen.getByRole('button', { name: 'dismiss' }));
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders an exportable version of state', async () => {
    await user.click(screen.getByRole('button', { name: 'viewWorkspaceConfiguration' }));
    expect(screen.getByRole('region').querySelector('pre')).toHaveTextContent( // eslint-disable-line testing-library/no-node-access
      '{ "companionWindows": {}, "config": {}, "elasticLayout": {}, "viewers": {}, "windows": {}, "workspace": {} }',
    );
  });
});
