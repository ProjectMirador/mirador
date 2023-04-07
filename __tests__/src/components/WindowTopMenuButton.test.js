import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { WindowTopMenuButton } from '../../../src/components/WindowTopMenuButton';

/** create wrapper */
function Subject({ ...props }) {
  return (
    <WindowTopMenuButton
      windowId="xyz"
      data-testid="test"
      classes={{ ctrlBtnSelected: 'ctrlBtnSelected' }}
      t={str => str}
      {...props}
    />
  );
}

describe('WindowTopMenuButton', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders the button element', () => {
    render(<Subject />);
    expect(screen.getByLabelText('windowMenu')).toBeInTheDocument();
  });

  it('toggles open/close of <WindowTopMenu/> when clicked', async () => {
    render(<Subject />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(screen.getByLabelText('windowMenu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    // click something else to close the menu (the windowMenu button is hidden at this point)
    await user.click(screen.getAllByRole('menuitem')[0]);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('the button has a class indicating that it is "selected" once it is clicked', async () => {
    render(<Subject />);
    await user.click(screen.getByLabelText('windowMenu'));
    expect(screen.getByLabelText('windowMenu')).toHaveClass('ctrlBtnSelected'); // eslint-disable-line testing-library/no-node-access
  });
});
