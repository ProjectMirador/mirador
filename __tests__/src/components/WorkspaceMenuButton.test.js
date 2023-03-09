import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/store';
import { WorkspaceMenuButton } from '../../../src/components/WorkspaceMenuButton';

describe('WorkspaceMenuButton', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
    renderWithProviders(
      <WorkspaceMenuButton classes={{ ctrlBtnSelected: 'ctrlBtnSelected' }} />,
    );
  });

  it('renders the button', () => {
    expect(screen.getByRole('button')).toHaveAccessibleName('workspaceMenu');
  });

  it('toggles open/close of <WorkspaceOptionsMenu /> when clicked', async () => {
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    // click something else to close the menu (the windowMenu button is hidden at this point)
    await user.click(screen.getAllByRole('menuitem')[0]);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
