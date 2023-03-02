import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/store';
import { WindowListButton } from '../../../src/components/WindowListButton';

/**
 * Helper function to create a shallow wrapper around WindowListButton
 */
function createWrapper(props) {
  return renderWithProviders(
    <WindowListButton
      t={str => str}
      windowCount={3}
      {...props}
    />,
    { preloadedState: { workspace: { windowIds: ['abc123'] } } },
  );
}

describe('WindowListButton', () => {
  it('shows the window count as a badge on the button', () => {
    createWrapper();

    expect(within(screen.getByRole('button')).getByText('3', { container: '.MuiBadge-badge' })).toBeInTheDocument();
  });

  it('disabled the MiradorMenuButton if the disabled prop is true', () => {
    createWrapper({ disabled: true });

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('toggles the WindowList comonent when clicking on the MiradorMenuButton', async () => {
    const user = userEvent.setup();
    createWrapper();
    await user.click(screen.getByRole('button'));

    expect(screen.getByText('openWindows', { container: '.MuiListSubheader-root' })).toBeInTheDocument();

    await user.click(screen.getByRole('menuitem', { name: 'untitled' }));

    expect(screen.queryByText('openWindows', { container: '.MuiListSubheader-root' })).not.toBeInTheDocument();
  });
});
