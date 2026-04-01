import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { Utils } from 'manifesto.js';

import { ThumbnailCanvasGrouping } from '../../../src/components/ThumbnailCanvasGrouping';
import CanvasGroupings from '../../../src/lib/CanvasGroupings';
import manifestJson from '../../fixtures/version-2/019.json';

/** create wrapper */
function createWrapper(props) {
  const canvasGroupings = new CanvasGroupings(
    Utils.parseManifest(manifestJson).getSequences()[0].getCanvases(),
  ).groupings();

  return render(
    <ThumbnailCanvasGrouping
      index={1}
      currentCanvasId="https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1"
      classes={{}}
      style={{
        height: 90,
        top: 0,
        width: 100,
      }}
      showThumbnailLabels
      canvasGroupings={canvasGroupings}
      height={131}
      position="far-bottom"
      {...props}
    />,
  );
}

describe('ThumbnailCanvasGrouping', () => {
  let wrapper;
  let setCanvas;
  beforeEach(() => {
    setCanvas = vi.fn();
    wrapper = createWrapper({ setCanvas });
  });
  const spyCurrentCanvasClass = vi.spyOn(ThumbnailCanvasGrouping.prototype, 'currentCanvasClass');
  afterEach(() => {
    spyCurrentCanvasClass.mockClear();
  });
  it('renders', () => {
    expect(screen.getByRole('gridcell')).toBeInTheDocument();
  });
  it('renders a CaptionedIIIFThumbnail', () => {
    expect(screen.getByText('Image 1')).toBeInTheDocument();
  });
  it('when clicked, updates the current canvas', async () => {
    wrapper.unmount();
    const user = userEvent.setup();
    wrapper = createWrapper({ index: 0, setCanvas });
    // eslint-disable-next-line testing-library/no-node-access
    await user.click(wrapper.container.querySelector('.mirador-thumbnail-nav-canvas-0'));
    expect(spyCurrentCanvasClass).toHaveBeenCalledWith([0]);
    expect(spyCurrentCanvasClass).toHaveReturnedWith('current-canvas-grouping');
    expect(setCanvas).toHaveBeenCalledWith(
      'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json',
    );
  });
  describe('attributes based off far-bottom position', () => {
    it('in button div', () => {
      expect(screen.getByRole('button', { name: 'Image 1' })).toHaveStyle({
        height: '119px',
        width: 'auto',
      });
    });
  });
  describe('attributes based off far-right position', () => {
    beforeEach(() => {
      wrapper.unmount();
      createWrapper({
        position: 'far-right',
        setCanvas,
      });
    });
    it('in button div', () => {
      expect(screen.getByRole('button', { name: 'Image 1' })).toHaveStyle({
        height: 'auto',
        width: '100px',
      });
    });
  });
});
