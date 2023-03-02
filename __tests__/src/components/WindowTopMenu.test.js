import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WindowTopMenu } from '../../../src/components/WindowTopMenu';
import { renderWithProviders } from '../../utils/store';

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
    renderWithProviders(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} open />);

    expect(screen.getByRole('menu')).toBeInTheDocument();

    const menuSections = within(screen.getByRole('menu')).getAllByRole('presentation');
    expect(menuSections).toHaveLength(2);
    expect(menuSections[0]).toHaveTextContent('view');
    expect(menuSections[1]).toHaveTextContent('thumbnail');

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(5);
    expect(menuItems[0]).toHaveTextContent('single');
    expect(menuItems[1]).toHaveTextContent('gallery');
    expect(menuItems[2]).toHaveTextContent('off');
    expect(menuItems[3]).toHaveTextContent('bottom');
    expect(menuItems[4]).toHaveTextContent('right');
  });

  it('does not display unless open', () => {
    createAnchor();
    renderWithProviders(<Subject open={false} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('fires the correct callbacks on menu close', async () => {
    const user = userEvent.setup();
    createAnchor();
    const handleClose = jest.fn();
    const toggleDraggingEnabled = jest.fn();
    const anchorEl = screen.getByTestId('menu-trigger-button');

    renderWithProviders(<Subject
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
