import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { ZoomControls } from '../../../src/components/ZoomControls';

/** Utility function to create a shallow rendering */
function createWrapper(props) {
  return render(
    <ZoomControls
      windowId="xyz"
      zoomToWorld={() => {}}
      {...props}
    />,
  );
}

describe('ZoomControls', () => {
  const viewer = { x: 100, y: 100, zoom: 1 };
  let updateViewport;

  const zoomToWorld = jest.fn();
  let user;
  beforeEach(() => {
    user = userEvent.setup();
    updateViewport = jest.fn();
    createWrapper({
      updateViewport, viewer, zoomToWorld,
    });
  });

  it('renders a couple buttons', () => {
    expect(screen.getByRole('button', { name: 'zoomIn' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'zoomOut' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'zoomReset' })).toBeInTheDocument();
  });

  it('has a zoom-in button', async () => {
    await user.click(screen.getByRole('button', { name: 'zoomIn' }));

    expect(updateViewport).toHaveBeenCalledWith('xyz', { zoom: 2 });
  });

  it('has a zoom-out button', async () => {
    await user.click(screen.getByRole('button', { name: 'zoomOut' }));
    expect(updateViewport).toHaveBeenCalledWith('xyz', { zoom: 0.5 });
  });

  it('has a zoom reset button', async () => {
    await user.click(screen.getByRole('button', { name: 'zoomReset' }));

    expect(zoomToWorld).toHaveBeenCalledWith(false);
  });
});
