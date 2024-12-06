import { render, screen, within } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { WindowTopMenu } from '../../../src/components/WindowTopMenu';

/** create wrapper */
function Subject({ ...props }) {
  return (
    <div>
      <WindowTopMenu
        windowId="xyz"
        handleClose={() => {}}
        toggleDraggingEnabled={() => {}}
        {...props}
      />
      ,
    </div>
  );
}

/** create anchor element */
function createAnchor() {
  return render(
    <button type="button" data-testid="menu-trigger-button">Button</button>,
  );
}

describe('WindowTopMenu', () => {
  it('renders all needed elements when open', () => {
    createAnchor();
    render(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} open />);

    expect(screen.getByRole('menu')).toBeInTheDocument();

    const menuSections = within(screen.getByRole('menu')).getAllByRole('presentation');
    expect(menuSections).toHaveLength(2);
    expect(menuSections[0]).toHaveTextContent('View');
    expect(menuSections[1]).toHaveTextContent('Thumbnails');

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(5);
    expect(menuItems[0]).toHaveTextContent('Single');
    expect(menuItems[1]).toHaveTextContent('Gallery');
    expect(menuItems[2]).toHaveTextContent('Off');
    expect(menuItems[3]).toHaveTextContent('Bottom');
    expect(menuItems[4]).toHaveTextContent('Right');
  });

  it('does not display unless open', () => {
    createAnchor();
    render(<Subject open={false} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('fires the correct callbacks on menu close', async () => {
    const user = userEvent.setup();
    createAnchor();
    const handleClose = vi.fn();
    const toggleDraggingEnabled = vi.fn();
    const anchorEl = screen.getByTestId('menu-trigger-button');

    render(<Subject
      anchorEl={anchorEl}
      handleClose={handleClose}
      open
      toggleDraggingEnabled={toggleDraggingEnabled}
    />);

    // click a menu item should close the menu
    const menuItems = screen.getAllByRole('menuitem');
    await user.click(menuItems[0]);
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(toggleDraggingEnabled).toHaveBeenCalledTimes(1);
  });
});
