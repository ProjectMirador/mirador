import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Resource } from 'manifesto.js';
import { renderWithProviders } from '../../utils/store';
import { CanvasLayers } from '../../../src/components/CanvasLayers';

/** Utility function to wrap CanvasAnnotations */
function createWrapper(props) {
  return renderWithProviders(
    <CanvasLayers
      canvasId="foo"
      classes={{}}
      index={0}
      label="A Canvas Label"
      layerMetadata={{}}
      layers={[]}
      t={t => t}
      totalSize={1}
      updateLayers={() => {}}
      windowId="abc"
      {...props}
    />,
  );
}

describe('CanvasLayers', () => {
  describe('with multiple canvases', () => {
    it('displays the canvas label', () => {
      createWrapper({ totalSize: 2 });

      expect(screen.getByText('annotationCanvasLabel', { container: '.MuiTypography-overline' })).toBeInTheDocument();
    });
  });

  it('renders canvas layers in a list', () => {
    createWrapper({
      canvasId: 'https://prtd.app/hamilton/canvas/p1.json',
      layers: [
        new Resource({ id: 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_PSC/full/862,1024/0/default.jpg' }, {}),
        new Resource({ id: 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png' }, {}),
      ],
    });

    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('1');
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('2');

    expect(screen.getAllByRole('button', { name: 'layer_hide' }).length).toEqual(2);
    expect(screen.getAllByRole('button', { name: 'layer_moveToTop' }).length).toEqual(2);
    expect(screen.getAllByRole('spinbutton', { name: 'layer_opacity' }).length).toEqual(2);
  });

  it('handles drag + drop of layers', async () => {
    const updateLayers = jest.fn();
    createWrapper({
      canvasId: 'foo',
      layers: [
        new Resource({ id: 'a' }, {}),
        new Resource({ id: 'b' }, {}),
      ],
      updateLayers,
    });

    const buttons = screen.getAllByRole('button');
    const layer = buttons.find(b => b.getAttribute('data-rfd-drag-handle-draggable-id') === 'b');

    layer.focus();

    // TODO: user-event doesn't believe in sending keycode values
    // (https://github.com/testing-library/user-event/issues/842)
    // but beautiful-dnd requires them. So this doesn't work:
    // await user.keyboard('{Space}');
    // await user.keyboard('{ArrowUp}');

    fireEvent.keyDown(layer, { code: 'Space', keyCode: 32 });
    fireEvent.keyDown(layer, { code: 'ArrowUp', keyCode: 38 });
    fireEvent.keyDown(layer, { code: 'Space', keyCode: 32 });

    expect(updateLayers).toHaveBeenCalledWith('abc', 'foo', {
      a: { index: 1 },
      b: { index: 0 },
    });
  });

  describe('actions', () => {
    let updateLayers;
    let user;

    beforeEach(() => {
      updateLayers = jest.fn();
      user = userEvent.setup();
      createWrapper({
        canvasId: 'https://prtd.app/hamilton/canvas/p1.json',
        layers: [
          new Resource({ id: 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_PSC/full/862,1024/0/default.jpg' }, {}),
          new Resource({ id: 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png' }, {}),
        ],
        updateLayers,
      });
    });

    it('has a button for moving a layer to the top', async () => {
      await user.click(screen.getAllByLabelText('layer_moveToTop')[1]);

      expect(updateLayers).toHaveBeenCalledWith('abc', 'https://prtd.app/hamilton/canvas/p1.json', {
        'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_PSC/full/862,1024/0/default.jpg': {
          index: 1,
        },
        'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png': {
          index: 0,
        },
      });
    });

    it('has a button for toggling visibility', async () => {
      await user.click(screen.getAllByLabelText('layer_hide')[1]);

      expect(updateLayers).toHaveBeenCalledWith('abc', 'https://prtd.app/hamilton/canvas/p1.json', {
        'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png': {
          visibility: false,
        },
      });
    });

    xit('has a slider to changing layer opacity', async () => {
      const target = screen.getAllByRole('slider')[1];
      await user.click(target);
      await user.type(target, '{Space}');
      await user.type(target, '{ArrowLeft}');

      expect(updateLayers).toHaveBeenCalledWith('abc', 'https://prtd.app/hamilton/canvas/p1.json', {
        'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png': {
          opacity: 0.5,
        },
      });
    });

    it('has a text input to changing layer opacity', () => {
      fireEvent.change(screen.getAllByRole('spinbutton')[1], { target: { value: '90' } });

      expect(updateLayers).toHaveBeenCalledWith('abc', 'https://prtd.app/hamilton/canvas/p1.json', {
        'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png': {
          opacity: 0.9,
        },
      });
    });
  });
});
