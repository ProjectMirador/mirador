import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Utils } from 'manifesto.js';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { renderWithProviders } from '../../utils/store';
import manifestJson from '../../fixtures/version-2/019.json';
import { GalleryViewThumbnail } from '../../../src/components/GalleryViewThumbnail';

/** create wrapper */
function createWrapper(props) {
  return renderWithProviders(
    <GalleryViewThumbnail
      canvas={Utils.parseManifest(manifestJson).getSequences()[0].getCanvases()[0]}
      classes={{ selected: 'selected' }}
      focusOnCanvas={() => {}}
      setCanvas={() => {}}
      {...props}
    />,
  );
}

describe('GalleryView', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });
  it('sets a mirador-current-canvas-grouping class when the canvas is selected', () => {
    createWrapper({ selected: true });
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('selected');
  });
  it('does not set a mirador-current-canvas-grouping class when the canvas is not selected', () => {
    createWrapper({ selected: false });
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toHaveClass('selected');
  });
  it('sets a mirador-current-canvas-grouping class when the canvas is selected', () => {
    createWrapper({ selected: true });
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('selected');
  });
  it('does not set a mirador-current-canvas-grouping class when the canvas is not selected', () => {
    createWrapper({ selected: false });
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toHaveClass('selected');
  });
  it('renders the thumbnail', () => {
    createWrapper({ config: { height: 55 } });
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toHaveStyle('height: 55px');
  });
  it('sets the selected canvas on click', async () => {
    const setCanvas = jest.fn();
    createWrapper({ setCanvas });
    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));
    expect(setCanvas).toHaveBeenCalledWith('http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json');
  });

  it('sets the window mode if the selected canvas is clicked', async () => {
    const focusOnCanvas = jest.fn();
    createWrapper({ focusOnCanvas, selected: true });
    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));
    expect(focusOnCanvas).toHaveBeenCalled();
  });

  it('sets the window mode if the user hits enter while on a canvas', () => {
    const focusOnCanvas = jest.fn();
    createWrapper({ focusOnCanvas, selected: true });
    const button = screen.getByRole('button');
    button.focus();
    fireEvent.keyUp(button, { code: 'Enter', key: 'Enter' });
    expect(focusOnCanvas).toHaveBeenCalled();
  });

  it('sets the window mode if the user hits space while on a canvas', () => {
    const focusOnCanvas = jest.fn();
    createWrapper({ focusOnCanvas, selected: true });
    const button = screen.getByRole('button');
    button.focus();
    fireEvent.keyUp(button, { code: ' ', key: ' ' });
    expect(focusOnCanvas).toHaveBeenCalled();
  });

  it('sets the canvas if the user hits a key (non-space or non-enter) while on a canvas', () => {
    const setCanvas = jest.fn();
    createWrapper({ selected: true, setCanvas });
    const button = screen.getByRole('button');
    button.focus();
    fireEvent.keyUp(button, { code: 'd', key: 'd' });
    expect(setCanvas).toHaveBeenCalledWith('http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json');
  });

  describe('on-demand annotation fetching', () => {
    const canvas = {
      getHeight: () => 50,
      getServices: jest.fn(),
      getThumbnail: jest.fn(),
      getType: jest.fn(),
      getWidth: () => 50,
      isCanvas: jest.fn(),
      isCollection: jest.fn(),
      isManifest: jest.fn(),
    };
    let requestCanvasAnnotations;

    beforeEach(() => { requestCanvasAnnotations = jest.fn(); });
    it('triggers requestCanvasAnnotations when there is an intersection and no annotions ', () => {
      createWrapper({ annotationsCount: 0, canvas, requestCanvasAnnotations });
      mockAllIsIntersecting(true);
      expect(requestCanvasAnnotations).toHaveBeenCalledTimes(1);
    });
    it('does nothing if there is an intersection and existing annotations', () => {
      createWrapper({ annotationsCount: 1, canvas, requestCanvasAnnotations });
      mockAllIsIntersecting(true);
      expect(requestCanvasAnnotations).not.toHaveBeenCalled();
    });
    it('does nothing if there is no intersection', () => {
      createWrapper({ annotationsCount: 0, canvas, requestCanvasAnnotations });
      expect(requestCanvasAnnotations).not.toHaveBeenCalled();
    });
  });

  describe('annotation count chip', () => {
    it('hides the chip if there are no annotations', () => {
      const { container } = createWrapper({ annotationsCount: 0 });
      expect(container.querySelector('.MuiChip-root')).not.toBeInTheDocument(); // eslint-disable-line testing-library/no-node-access, testing-library/no-container
    });

    it('shows the number of search annotations on a canvas', () => {
      const { container } = createWrapper({ annotationsCount: 50 });
      expect(container.querySelector('.MuiChip-root')).toBeInTheDocument(); // eslint-disable-line testing-library/no-node-access, testing-library/no-container
      expect(container.querySelector('.MuiChip-root')).toHaveTextContent('50'); // eslint-disable-line testing-library/no-node-access, testing-library/no-container
    });
  });

  describe('search annotation count chip', () => {
    it('hides the chip if there are no annotations', () => {
      const { container } = createWrapper({ searchAnnotationsCount: 0 });
      expect(container.querySelector('.MuiChip-root')).not.toBeInTheDocument(); // eslint-disable-line testing-library/no-node-access, testing-library/no-container
    });

    it('shows the number of search annotations on a canvas', () => {
      const { container } = createWrapper({ searchAnnotationsCount: 50 });
      expect(container.querySelector('.MuiChip-root')).toBeInTheDocument(); // eslint-disable-line testing-library/no-node-access, testing-library/no-container
      expect(container.querySelector('.MuiChip-root')).toHaveTextContent('50'); // eslint-disable-line testing-library/no-node-access, testing-library/no-container
    });
  });
});
