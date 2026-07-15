import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { WindowTopBar } from '../../../src/components/WindowTopBar';
import PluginContext from '../../../src/extend/PluginContext';
import AddComponentD from '../components/AddComponentD';

describe('WindowTopBarPluginArea button interaction', () => {
  it('plugin buttons respond to first click without requiring secondary click', async () => {
    const user = userEvent.setup();

    const props = {
      allowClose: true,
      allowMaximize: true,
      allowTopMenuButton: true,
      allowWindowSideBar: true,
      focusWindow: vi.fn(),
      removeWindow: vi.fn(),
      toggleWindowSideBar: vi.fn(),
      windowId: 'test-window',
    };

    // Create plugin map for WindowTopBarPluginArea target
    const pluginMap = {
      WindowTopBarPluginArea: {
        add: [
          {
            component: AddComponentD,
            mode: 'add',
            target: 'WindowTopBarPluginArea',
          },
        ],
      },
    };

    render(
      <PluginContext.Provider value={pluginMap}>
        <WindowTopBar {...props} />
      </PluginContext.Provider>,
    );

    // Plugin button should be present
    const pluginButton = screen.getByTestId('plugin-button-d');
    expect(pluginButton).toHaveTextContent('Open');
    expect(pluginButton).toHaveAttribute('aria-expanded', 'false');

    // Content should not be visible initially
    expect(screen.queryByTestId('plugin-content-d')).not.toBeInTheDocument();

    // First click should toggle the button state
    await user.click(pluginButton);

    // Verify button state changed on first click (no secondary click required)
    expect(pluginButton).toHaveTextContent('Close');
    expect(pluginButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('plugin-content-d')).toBeInTheDocument();

    // Click again to close
    await user.click(pluginButton);
    expect(pluginButton).toHaveTextContent('Open');
    expect(screen.queryByTestId('plugin-content-d')).not.toBeInTheDocument();
  });
});
