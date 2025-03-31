import { screen, render } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { WindowTopBarMenu } from '../../../src/components/WindowTopBarMenu';

/** create wrapper */
function Subject({ ...props }) {
  return (
    <WindowTopBarMenu
      windowId="xyz"
      classes={{}}
      maximizeWindow={() => {}}
      minimizeWindow={() => {}}
      removeWindow={() => {}}
      {...props}
    />
  );
}

describe('WindowTopBarMenu', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });

  it('passes correct callback to closeWindow button', async () => {
    const removeWindow = vi.fn();
    render(<Subject allowClose removeWindow={removeWindow} />);
    const button = screen.getByRole('button', { name: 'Close window' });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(removeWindow).toHaveBeenCalledTimes(1);
  });

  it('passes correct callback to maximizeWindow button', async () => {
    const maximizeWindow = vi.fn();
    render(<Subject allowMaximize maximizeWindow={maximizeWindow} />);
    const button = screen.getByRole('button', { name: 'Maximize window' });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(maximizeWindow).toHaveBeenCalledTimes(1);
  });
});
