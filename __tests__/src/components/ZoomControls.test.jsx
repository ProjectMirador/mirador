import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { ZoomControls } from '../../../src/components/ZoomControls';
import OpenSeadragonViewerContext from '../../../src/contexts/OpenSeadragonViewerContext';

/** Builds a mock OpenSeadragonViewerContext ref exposing the given zoom bounds */
function osdViewerWithZoom({ zoom, minZoom, maxZoom }) {
  return {
    current: {
      viewport: {
        getMaxZoom: () => maxZoom,
        getMinZoom: () => minZoom,
        zoomSpring: { target: { value: zoom } },
      },
    },
  };
}

/** Utility function to create a shallow rendering */
function createWrapper(props, osdViewer = { current: null }) {
  return render(
    <OpenSeadragonViewerContext.Provider value={osdViewer}>
      <ZoomControls windowId="xyz" zoomToWorld={() => {}} {...props} />
    </OpenSeadragonViewerContext.Provider>,
  );
}

describe('ZoomControls', () => {
  const viewer = { x: 100, y: 100, zoom: 1 };
  let updateViewport;

  const zoomToWorld = vi.fn();
  let user;
  beforeEach(() => {
    user = userEvent.setup();
    updateViewport = vi.fn();
    createWrapper({
      updateViewport,
      viewer,
      zoomToWorld,
    });
  });

  it('renders a couple buttons', () => {
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Zoom out' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset zoom' })).toBeInTheDocument();
  });

  it('has a zoom-in button', async () => {
    await user.click(screen.getByRole('button', { name: 'Zoom in' }));

    expect(updateViewport).toHaveBeenCalledWith('xyz', { zoom: 2 });
  });

  it('has a zoom-out button', async () => {
    await user.click(screen.getByRole('button', { name: 'Zoom out' }));
    expect(updateViewport).toHaveBeenCalledWith('xyz', { zoom: 0.5 });
  });

  it('has a zoom reset button', async () => {
    await user.click(screen.getByRole('button', { name: 'Reset zoom' }));

    expect(zoomToWorld).toHaveBeenCalledWith(false);
  });

  describe('with a live OSD viewport', () => {
    // Regression coverage: previously the next zoom was computed from
    // redux's viewer.zoom, which only updates after OSD's animation-finish
    // round-trip -- so repeated clicks could dispatch a zoom well past the
    // real min/max before that round-trip ever caught up, requiring extra
    // clicks in the other direction before anything visibly changed.
    it('clamps the requested zoom-in to the live max, even if redux is stale', async () => {
      updateViewport = vi.fn();
      createWrapper(
        {
          updateViewport,
          viewer: { ...viewer, zoom: 999 },
          zoomToWorld,
        },
        osdViewerWithZoom({ maxZoom: 0.5, minZoom: 0.1, zoom: 0.4 }),
      );

      await user.click(screen.getAllByRole('button', { name: 'Zoom in' }).at(-1));

      expect(updateViewport).toHaveBeenLastCalledWith('xyz', { zoom: 0.5 });
    });

    it('clamps the requested zoom-out to the live min, even if redux is stale', async () => {
      updateViewport = vi.fn();
      createWrapper(
        {
          updateViewport,
          viewer: { ...viewer, zoom: 0.001 },
          zoomToWorld,
        },
        osdViewerWithZoom({ maxZoom: 0.5, minZoom: 0.1, zoom: 0.15 }),
      );

      await user.click(screen.getAllByRole('button', { name: 'Zoom out' }).at(-1));

      expect(updateViewport).toHaveBeenLastCalledWith('xyz', { zoom: 0.1 });
    });

    it('disables zoom-in once the live zoom has reached the max', () => {
      createWrapper({}, osdViewerWithZoom({ maxZoom: 0.5, minZoom: 0.1, zoom: 0.5 }));

      expect(screen.getAllByRole('button', { name: 'Zoom in' }).at(-1)).toBeDisabled();
    });

    it('disables zoom-out once the live zoom has reached the min', () => {
      createWrapper({}, osdViewerWithZoom({ maxZoom: 0.5, minZoom: 0.1, zoom: 0.1 }));

      expect(screen.getAllByRole('button', { name: 'Zoom out' }).at(-1)).toBeDisabled();
    });

    it('does not disable either button while strictly between min and max', () => {
      createWrapper({}, osdViewerWithZoom({ maxZoom: 0.5, minZoom: 0.1, zoom: 0.3 }));

      expect(screen.getAllByRole('button', { name: 'Zoom in' }).at(-1)).toBeEnabled();
      expect(screen.getAllByRole('button', { name: 'Zoom out' }).at(-1)).toBeEnabled();
    });
  });

  it('does not crash when viewer is explicitly null', () => {
    expect(() => createWrapper({ viewer: null })).not.toThrow();
  });
});
