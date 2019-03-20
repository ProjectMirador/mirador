import React from 'react';
import { shallow } from 'enzyme';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import manifesto from 'manifesto.js';
import { WindowSideBarCanvasPanel } from '../../../src/components/WindowSideBarCanvasPanel';
import { CanvasThumbnail } from '../../../src/components/CanvasThumbnail';
import manifestJson from '../../fixtures/version-2/019.json';

/**
 * Helper function to create a shallow wrapper around WindowSideBarCanvasPanel
 */
function createWrapper(props) {
  const canvases = manifesto.create(manifestJson).getSequences()[0].getCanvases();

  return shallow(
    <WindowSideBarCanvasPanel
      id="asdf"
      canvases={canvases}
      classes={{}}
      t={key => key}
      windowId="xyz"
      setCanvas={() => {}}
      config={{ canvasNavigation: { height: 100 } }}
      {...props}
    />,
  );
}

describe('WindowSideBarCanvasPanel', () => {
  let setCanvas;

  beforeEach(() => {
    setCanvas = jest.fn();
  });

  it('renders all needed elements for the thumbnail view', () => {
    const wrapper = createWrapper();
    expect(wrapper.props().title).toBe('canvasIndex');
    expect(wrapper.find(List).length).toBe(1);
    expect(wrapper.find(ListItem).length).toBe(3);
    expect(wrapper.find(ListItem).first().props().component).toEqual('li');
    expect(wrapper.find(List).find(Typography).length).toBe(3);
    expect(wrapper.find(CanvasThumbnail).length).toBe(3);
  });

  describe('handleVariantChange', () => {
    it('toggles state', () => {
      const wrapper = createWrapper();
      wrapper.instance().handleVariantChange({ target: { value: 'compact' } });
      expect(wrapper.state().variant).toBe('compact');
    });
  });

  it('renders all needed elements for the compact view', () => {
    const wrapper = createWrapper();
    wrapper.setState({ variant: 'compact' });
    expect(wrapper.props().title).toBe('canvasIndex');
    expect(wrapper.find(List).length).toBe(1);
    expect(wrapper.find(ListItem).length).toBe(3);
    expect(wrapper.find(ListItem).first().props().component).toEqual('li');
    expect(wrapper.find(List).find(Typography).length).toBe(3);
    expect(wrapper.find(CanvasThumbnail).length).toBe(0);
  });


  it('should set the correct labels', () => {
    const wrapper = createWrapper();

    expect(wrapper
      .find(List)
      .find(Typography)
      .at(0)
      .render()
      .text()).toBe('Test 19 Canvas: 1');

    expect(wrapper
      .find(List)
      .find(Typography)
      .at(1)
      .render()
      .text()).toBe('Image 1');
  });

  it('should call the onClick handler of a list item', () => {
    const wrapper = createWrapper({ setCanvas });
    wrapper.find(ListItem).at(1).simulate('click');
    expect(setCanvas).toHaveBeenCalledTimes(1);
  });

  describe('getIdAndLabelOfCanvases', () => {
    it('should return id and label of each canvas in manifest', () => {
      const canvases = manifesto
        .create(manifestJson)
        .getSequences()[0]
        .getCanvases();
      const wrapper = createWrapper({ canvases });
      const received = wrapper.instance().getIdAndLabelOfCanvases(canvases);
      const expected = [
        {
          id: 'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json',
          label: 'Test 19 Canvas: 1',
        },
        {
          id: 'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1',
          label: 'Image 1',
        },
        {
          id: 'https://purl.stanford.edu/rz176rt6531/iiif/canvas/rz176rt6531_1',
          label: 'Image 2',
        },
      ];
      expect(received).toEqual(expected);
    });

    it('should return empty array if canvas if empty', () => {
      const wrapper = createWrapper({ canvases: [] });
      const received = wrapper.instance().getIdAndLabelOfCanvases([]);
      expect(received).toEqual([]);
    });
  });
});
