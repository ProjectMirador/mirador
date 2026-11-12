import { screen, render } from '@tests/utils/test-utils';
import { userEvent } from 'vitest/browser';
import { WorkspaceExport } from '../../../src/components/WorkspaceExport';

describe('WorkspaceExport', () => {
  let handleClose;
  let mockState;

  beforeEach(() => {
    handleClose = vi.fn();
    mockState = {
      companionWindows: {},
      config: {},
      elasticLayout: {},
      viewers: {},
      windows: {},
      workspace: {},
    };

    render(<WorkspaceExport open handleClose={handleClose} exportableState={mockState} />);
  });

  it('renders without an error', () => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders sizing props', () => {
    expect(screen.getByRole('dialog')).toHaveClass('MuiDialog-paperWidthSm');
  });

  it('is closable by clicking the cancel button', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(handleClose).toHaveBeenCalled();
  });

  it('reveals a snackbar on copy', async () => {
  const promptSpy = vi.spyOn(window, 'prompt').mockReturnValue(true);

  await userEvent.click(screen.getByRole('button', { name: 'Copy' }));

  expect(screen.getByRole('alert')).toHaveTextContent(
    'The workspace configuration was copied to your clipboard',
  );

  promptSpy.mockRestore();
});

  it('renders an exportable version of state', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'View workspace configuration' }));
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('region').querySelector('pre')).toHaveTextContent(
      '{ "companionWindows": {}, "config": {}, "elasticLayout": {}, "viewers": {}, "windows": {}, "workspace": {} }',
    );
  });
});
