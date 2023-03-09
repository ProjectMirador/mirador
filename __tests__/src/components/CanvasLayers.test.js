import { screen, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import userEvent from '@testing-library/user-event';
import { Resource } from 'manifesto.js';
import { DragDropContext } from '@hello-pangea/dnd';
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

  // TODO: Convert this to RTL
  it('handles drag + drop of layers', () => {
    const updateLayers = jest.fn();

    const wrapper = shallow(
      <CanvasLayers canvasId="foo" windowId="abc" layers={[{ id: 'a' }, { id: 'b' }]} updateLayers={updateLayers} />,
    );
    const { droppableId } = wrapper.instance();

    wrapper.find(DragDropContext).simulate('dragEnd', {
      destination: { droppableId, index: 0 },
      source: { droppableId, index: 1 },
    });

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
