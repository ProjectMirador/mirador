import React from 'react';
import { shallow } from 'enzyme';
import manifesto from 'manifesto.js';
import Input from '@material-ui/core/Input';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import manifestFixtureHamilton from '../../fixtures/version-2/hamilton.json';
import { CanvasLayers } from '../../../src/components/CanvasLayers';
import { CanvasThumbnail } from '../../../src/components/CanvasThumbnail';

/** Utility function to wrap CanvasAnnotations */
function createWrapper(props) {
  return shallow(
    <CanvasLayers
      canvas={{ id: 'foo' }}
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
      const wrapper = createWrapper({ totalSize: 2 });

      expect(wrapper.find(Typography).text()).toEqual('annotationCanvasLabel');
    });
  });

  it('renders canvas layers in a list', () => {
    const wrapper = createWrapper({
      canvas: manifesto.create(manifestFixtureHamilton).getSequences()[0].getCanvasByIndex(0),
      layers: [
        { id: 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_PSC/full/862,1024/0/default.jpg' },
        { id: 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png' },
      ],
    });

    const inner = shallow(
      wrapper.find(Droppable).prop('children')({}, {}),
    );

    expect(inner.find(Draggable).length).toEqual(2);
    expect(inner.find(Draggable).at(0).prop('draggableId')).toEqual('https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_PSC/full/862,1024/0/default.jpg');
    expect(inner.find(Draggable).at(1).prop('draggableId')).toEqual('https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png');

    const layer = shallow(
      inner.find(Draggable).at(0).prop('children')({}, {}),
    );

    expect(layer.find(CanvasThumbnail).prop('imageUrl')).toEqual('https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_PSC/full/50,/0/default.jpg');
    expect(layer.find(Typography).text()).toEqual('1');
    expect(layer.find('[aria-label="layer_hide"]').length).toEqual(1);
    expect(layer.find('[aria-label="layer_moveToTop"]').length).toEqual(1);
    expect(layer.find('[title="layer_opacity"]').length).toEqual(1);
  });

  it('handles drag + drop of layers', () => {
    const updateLayers = jest.fn();

    const wrapper = createWrapper({
      layers: [
        { id: 'a' },
        { id: 'b' },
      ],
      updateLayers,
    });

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
    let layer;
    let updateLayers;

    beforeEach(() => {
      updateLayers = jest.fn();
      const wrapper = createWrapper({
        canvas: manifesto.create(manifestFixtureHamilton).getSequences()[0].getCanvasByIndex(0),
        layers: [
          { id: 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_PSC/full/862,1024/0/default.jpg' },
          { id: 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png' },
        ],
        updateLayers,
      });
      layer = shallow(wrapper.instance().renderLayer({ id: 'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png' }, 1));
    });

    it('has a button for moving a layer to the top', () => {
      layer.find('[aria-label="layer_moveToTop"]').simulate('click');

      expect(updateLayers).toHaveBeenCalledWith('abc', 'https://prtd.app/hamilton/canvas/p1.json', {
        'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_PSC/full/862,1024/0/default.jpg': {
          index: 1,
        },
        'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png': {
          index: 0,
        },
      });
    });

    it('has a button for toggling visibility', () => {
      layer.find('[aria-label="layer_hide"]').simulate('click');

      expect(updateLayers).toHaveBeenCalledWith('abc', 'https://prtd.app/hamilton/canvas/p1.json', {
        'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png': {
          visibility: false,
        },
      });
    });

    it('has a slider to changing layer opacity', () => {
      layer.find(Slider).simulate('change', {}, 50);

      expect(updateLayers).toHaveBeenCalledWith('abc', 'https://prtd.app/hamilton/canvas/p1.json', {
        'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png': {
          opacity: 0.5,
        },
      });
    });

    it('has a text input to changing layer opacity', () => {
      layer.find(Input).simulate('change', { target: { value: 70 } });

      expect(updateLayers).toHaveBeenCalledWith('abc', 'https://prtd.app/hamilton/canvas/p1.json', {
        'https://prtd.app/image/iiif/2/hamilton%2fHL_524_1r_00_TS_Blue/full/862,1024/0/default.png': {
          opacity: 0.7,
        },
      });
    });
  });
});
