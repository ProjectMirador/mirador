import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { Utils } from 'manifesto.js';

import { ThumbnailCanvasGrouping } from '../../../src/components/ThumbnailCanvasGrouping';
import CanvasGroupings from '../../../src/lib/CanvasGroupings';
import manifestJson from '../../fixtures/version-2/019.json';

/** create wrapper */
function createWrapper(props) {
  const canvasGroupings = new CanvasGroupings(Utils.parseManifest(manifestJson).getSequences()[0].getCanvases()).groupings();

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

/** create wrapper backed by "book" view groupings, so a single grouping can contain 2 canvases */
function createBookWrapper(props) {
  const canvasGroupings = new CanvasGroupings(
    Utils.parseManifest(manifestJson).getSequences()[0].getCanvases(),
    'book',
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

/** the ThumbnailFrame wrapping each rendered thumbnail image, in canvas order */
function getThumbnailFrames() {
  return screen.getAllByRole('presentation').map((img) => img.parentElement.parentElement);
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
    expect(setCanvas).toHaveBeenCalledWith('http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json');
  });
  describe('attributes based off far-bottom position', () => {
    it('in button div', () => {
      expect(screen.getByRole('button', { name: 'Image 1' })).toHaveStyle({
        height: '90px',
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
  describe('ThumbnailFrame border/padding for a selected grouping', () => {
    const present = { border: '2px solid #1967d2', padding: '3px' };
    const absent = { border: 'none', padding: '0' };

    // jsdom's CSSOM doesn't resolve logical border/padding properties through jest-dom's
    // toHaveStyle (it can't set them via the inline style API it uses internally), but it does
    // resolve them correctly when read straight off getComputedStyle, so assert directly.
    /** */
    function expectFrame(frame, { inlineEnd, inlineStart }) {
      expect(frame).toHaveStyle({ borderBottom: present.border, paddingBottom: present.padding });
      expect(frame).toHaveStyle({ borderTop: present.border, paddingTop: present.padding });

      const cs = getComputedStyle(frame);
      expect(cs.borderInlineStart).toBe(inlineStart.border);
      expect(cs.paddingInlineStart).toBe(inlineStart.padding);
      expect(cs.borderInlineEnd).toBe(inlineEnd.border);
      expect(cs.paddingInlineEnd).toBe(inlineEnd.padding);
    }

    it('shows top, left, and bottom (not right) for the first item in a multi-canvas grouping', () => {
      wrapper.unmount();
      wrapper = createBookWrapper({ setCanvas });
      const [firstFrame] = getThumbnailFrames();

      expectFrame(firstFrame, { inlineEnd: absent, inlineStart: present });
    });

    it('shows top, right, and bottom (not left) for the last item in a multi-canvas grouping', () => {
      wrapper.unmount();
      wrapper = createBookWrapper({ setCanvas });
      const [, lastFrame] = getThumbnailFrames();

      expectFrame(lastFrame, { inlineEnd: present, inlineStart: absent });
    });

    it('shows all four sides for a single-canvas grouping (both first and last)', () => {
      const [onlyFrame] = getThumbnailFrames();

      expectFrame(onlyFrame, { inlineEnd: present, inlineStart: present });
    });
  });
});
