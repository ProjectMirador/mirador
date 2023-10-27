import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import Box from '@mui/material/Box';
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
  const showZoomControls = false;
  let updateViewport;
  const spyRenderDivider = jest.spyOn(ZoomControls.prototype, 'renderDivider');
  afterEach(() => {
    spyRenderDivider.mockClear();
  });

  describe('with showZoomControls=false', () => {
    it('renders nothing unless asked', () => {
      const { container } = createWrapper({ showZoomControls, updateViewport, viewer });
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('with showZoomControls=true', () => {
    const zoomToWorld = jest.fn();
    let user;
    beforeEach(() => {
      user = userEvent.setup();
      updateViewport = jest.fn();
      createWrapper({
        showZoomControls: true, updateViewport, viewer, zoomToWorld,
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

  /* eslint-disable testing-library/no-container, testing-library/no-node-access */
  describe('responsive divider', () => {
    it('is present when the displayDivider prop is true (default)', () => {
      createWrapper({ showZoomControls: true, viewer });
      expect(spyRenderDivider).toHaveBeenCalled();
      // Retrieve the result of the spy function
      const renderedDivider = spyRenderDivider.mock.results[0].value;
      expect(renderedDivider.type).toBe(Box);
    });

    it('is not present when the displayDivider prop is false', () => {
      createWrapper({ displayDivider: false, showZoomControls: true, viewer });

      expect(spyRenderDivider).toHaveBeenCalled();
      expect(spyRenderDivider).toHaveReturnedWith(null);
    });
  });
});
