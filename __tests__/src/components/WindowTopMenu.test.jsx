import { render, screen, within } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { WindowTopMenu } from '../../../src/components/WindowTopMenu';
import { usePlugins } from '../../../src/extend/usePlugins';

vi.mock('../../../src/extend/usePlugins');

/** create wrapper */
function Subject({ ...props }) {
  return (
    <div>
      <WindowTopMenu windowId="xyz" handleClose={() => {}} toggleDraggingEnabled={() => {}} {...props} />,
    </div>
  );
}

/** create anchor element */
function createAnchor() {
  return render(
    <button type="button" data-testid="menu-trigger-button">
      Button
    </button>,
  );
}

/** stand-in for a plugin's registered component */
function MockPluginComponent() {
  return <div data-testid="plugin-component" />;
}

describe('WindowTopMenu', () => {
  beforeEach(() => {
    vi.mocked(usePlugins).mockReturnValue({ PluginComponents: [] });
  });

  it('renders all needed elements when open', () => {
    createAnchor();
    render(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} open />);

    expect(screen.getByRole('menu')).toBeInTheDocument();

    const menuSections = within(screen.getByRole('menu')).getAllByRole('presentation');
    expect(menuSections).toHaveLength(2);

    expect(menuSections[0]).toHaveTextContent('View');
    const menus = within(screen.getByRole('menu')).getAllByRole('menubar');

    const viewItems = within(menus[0]).getAllByRole('menuitemradio');
    expect(viewItems).toHaveLength(2);
    expect(viewItems[0]).toHaveTextContent('Single');
    expect(viewItems[1]).toHaveTextContent('Gallery');

    expect(menuSections[1]).toHaveTextContent('Thumbnails');
    const thumbnailItems = within(menus[1]).getAllByRole('menuitemradio');
    expect(thumbnailItems).toHaveLength(3);
    expect(thumbnailItems[0]).toHaveTextContent('Off');
    expect(thumbnailItems[1]).toHaveTextContent('Bottom');
    expect(thumbnailItems[2]).toHaveTextContent('Right');
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

    render(<Subject anchorEl={anchorEl} handleClose={handleClose} open toggleDraggingEnabled={toggleDraggingEnabled} />);

    // click a menu item should close the menu
    const menuItems = screen.getAllByRole('menuitemradio');
    await user.click(menuItems[0]);
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(toggleDraggingEnabled).toHaveBeenCalledTimes(1);
  });

  it('hides the thumbnail settings when showThumbnailNavigationSettings is false', () => {
    createAnchor();
    render(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} open showThumbnailNavigationSettings={false} />);

    const menu = screen.getByRole('menu');
    expect(within(menu).getByText('View')).toBeInTheDocument();
    expect(within(menu).queryByText('Thumbnails')).not.toBeInTheDocument();
    expect(within(menu).getAllByRole('menuitemradio')).toHaveLength(2);
  });

  it('applies the window-top-menu class to the menu paper', () => {
    createAnchor();
    render(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} open />);

    expect(screen.getByTestId('menu-trigger-button')).toBeInTheDocument();
  });

  it('calls toggleDraggingEnabled when the menu opens', () => {
    createAnchor();
    const toggleDraggingEnabled = vi.fn();
    render(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} open toggleDraggingEnabled={toggleDraggingEnabled} />);

    expect(toggleDraggingEnabled).toHaveBeenCalledTimes(1);
  });

  it('closes the menu when Escape is pressed', async () => {
    const user = userEvent.setup();
    createAnchor();
    const handleClose = vi.fn();
    render(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} handleClose={handleClose} open />);

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close the menu on other key presses', async () => {
    const user = userEvent.setup();
    createAnchor();
    const handleClose = vi.fn();
    render(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} handleClose={handleClose} open />);

    await user.keyboard('a');
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('closes the menu when clicking outside of it', async () => {
    const user = userEvent.setup();
    createAnchor();
    const handleClose = vi.fn();
    render(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} handleClose={handleClose} open />);

    await user.click(document.body);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close the menu when clicking inside it', async () => {
    const user = userEvent.setup();
    createAnchor();
    const handleClose = vi.fn();
    render(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} handleClose={handleClose} open />);

    await user.click(within(screen.getByRole('menu')).getByText('View'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('traps focus within the menu', async () => {
    const user = userEvent.setup();
    createAnchor();
    render(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} open />);

    const menu = screen.getByRole('menu');
    // eslint-disable-next-line testing-library/no-node-access
    expect(menu).toContainElement(document.activeElement);

    await user.tab();
    // eslint-disable-next-line testing-library/no-node-access
    expect(menu).toContainElement(document.activeElement);
    await user.tab({ shift: true });
    await user.tab({ shift: true });
    // eslint-disable-next-line testing-library/no-node-access
    expect(menu).toContainElement(document.activeElement);
  });

  describe('when a plugin is registered for the WindowTopMenu target', () => {
    it('renders the plugin section header and the plugin component', () => {
      vi.mocked(usePlugins).mockReturnValue({ PluginComponents: [MockPluginComponent] });
      createAnchor();
      render(<Subject anchorEl={screen.getByTestId('menu-trigger-button')} open />);

      expect(screen.getByText('Options')).toBeInTheDocument();
      expect(screen.getByTestId('plugin-component')).toBeInTheDocument();
    });
  });
});
