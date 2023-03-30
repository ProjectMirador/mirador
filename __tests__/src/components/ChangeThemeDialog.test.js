import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { ChangeThemeDialog } from '../../../src/components/ChangeThemeDialog';

/**
 * Helper function to create a shallow wrapper around ErrorDialog
 */
function createWrapper(props) {
  render(
    <ChangeThemeDialog
      classes={{ darkColor: '#000000', lightColor: '#ffffff' }}
      handleClose={() => {}}
      open
      setSelectedTheme={() => {}}
      t={t => (t)}
      selectedTheme="light"
      themeIds={['light', 'dark']}
      {...props}
    />,
  );
}

describe('ChangeThemeDialog', () => {
  it('renders nothing when the dialog is not open', () => {
    createWrapper({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders propertly', () => {
    createWrapper();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows up theme selection properly', () => {
    createWrapper();

    const menuItems = screen.queryAllByRole('menuitem');

    expect(menuItems.length).toBe(2);
    expect(menuItems[0]).toHaveTextContent('light');
    expect(menuItems[1]).toHaveTextContent('dark');
  });

  it('shows up theme selection properly', async () => {
    const user = userEvent.setup();
    const setSelectedTheme = jest.fn();

    createWrapper({ setSelectedTheme });
    const menuItem = screen.getByRole('menuitem', { name: 'light' });
    expect(menuItem).toBeInTheDocument();

    await user.click(menuItem);

    expect(setSelectedTheme).toHaveBeenCalledWith('light');
  });

  describe('inital focus', () => {
    it('focuses the selected item', () => {
      createWrapper({ selectedTheme: 'light' });

      const menuItem = screen.getByRole('menuitem', { name: 'light' });
      expect(menuItem).toHaveFocus();
    });
  });
});
