import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { WorkspaceMenu } from '../../../src/components/WorkspaceMenu';

/** */
function createShallow(props) {
  return render(
    <WorkspaceMenu
      open
      showThemePicker
      {...props}
    />,
  );
}

describe('WorkspaceMenu', () => {
  let handleClose;
  const showZoomControls = false;
  let toggleZoomControls;

  beforeEach(() => {
    handleClose = jest.fn();
    toggleZoomControls = jest.fn();
  });

  it('renders without an error', () => {
    createShallow({ handleClose, showZoomControls, toggleZoomControls });
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('closes the current menu when opening a submenu', async () => {
    const user = userEvent.setup();
    createShallow({ handleClose, showZoomControls, toggleZoomControls });

    await user.click(screen.getByRole('menuitem', { name: 'showZoomControls' }));
    expect(handleClose).toBeCalled();
  });

  it('disables zoom controls if the workspaceAdd UI is visible', () => {
    createShallow({
      handleClose, isWorkspaceAddVisible: true, showZoomControls, toggleZoomControls,
    });

    expect(screen.getByRole('menuitem', { name: 'showZoomControls' })).toHaveAttribute('aria-disabled', 'true');
  });

  describe('handleZoomToggleClick', () => {
    it('resets the anchor state', async () => {
      const user = userEvent.setup();

      createShallow({ handleClose, showZoomControls, toggleZoomControls });

      await user.click(screen.getByRole('menuitem', { name: 'showZoomControls' }));

      expect(toggleZoomControls).toBeCalledWith(true);
    });
  });
});
