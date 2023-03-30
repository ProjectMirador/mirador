import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { WorkspaceOptionsButton } from '../../../src/components/WorkspaceOptionsButton';

/** create wrapper */
function Subject({ ...props }) {
  return (
    <div>
      <WorkspaceOptionsButton
        classes={{}}
        t={k => k}
        {...props}
      />
      ,
      ,
    </div>
  );
}

describe('WorkspaceOptionsButton', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders the button', () => {
    render(<Subject />);
    expect(screen.getByLabelText('workspaceOptions')).toBeInTheDocument();
  });

  it('toggles open/close of <WorkspaceOptionsMenu /> when clicked', async () => {
    render(<Subject />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(screen.getByLabelText('workspaceOptions'));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    // click something else to close the menu (the windowMenu button is hidden at this point)
    await user.click(screen.getAllByRole('menuitem')[0]);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
