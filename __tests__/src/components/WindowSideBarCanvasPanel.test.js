import React from 'react';
import { shallow } from 'enzyme';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import manifesto from 'manifesto.js';
import { WindowSideBarCanvasPanel } from '../../../src/components/WindowSideBarCanvasPanel';
import { CanvasThumbnail } from '../../../src/components/CanvasThumbnail';
import manifestJson from '../../fixtures/version-2/019.json';
import { getIdAndLabelOfCanvases } from '../../../src/state/selectors';

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

  it('renders elements for the TOC view', () => {
    const wrapper = createWrapper({
      structures: [{
        id: 'top',
        getLabel: () => [{ value: 'top' }],
        getCanvasIds: () => [],
        getRanges: () => [
          {
            id: '1', getLabel: () => [{ value: 'empty' }], getRanges: () => [], getCanvasIds: () => [],
          },
          {
            id: '2',
            getLabel: () => [{ value: 'one-with-ranges' }],
            getRanges: () => [
              {
                id: '2.1', getLabel: () => [{ value: 'subrange' }], getRanges: () => [], getCanvasIds: () => [],
              },
            ],
            getCanvasIds: () => [],
          },
          {
            id: '3',
            getLabel: () => [{ value: 'one-with-canvases' }],
            getRanges: () => [],
            getCanvasIds: () => [
              'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json',
            ],
          },
        ],
      }],
    });
    wrapper.setState({ variant: 'toc' });

    expect(wrapper.find(ExpansionPanel).length).toBe(5);

    expect(wrapper
      .find(ExpansionPanel)
      .at(1)
      .find(ExpansionPanelSummary)
      .at(0)
      .render()
      .text()).toEqual('empty');

    expect(wrapper.find(ExpansionPanel).at(2).find(List).find(ExpansionPanel).length).toEqual(1);

    expect(wrapper
      .find(ExpansionPanel).at(4).find(List)
      .find(Typography)
      .render()
      .text()).toEqual('Test 19 Canvas: 1');
  });

  it('should set the correct labels', () => {
    const wrapper = createWrapper();
    const canvases = manifesto.create(manifestJson).getSequences()[0].getCanvases();
    const idsAndLabels = getIdAndLabelOfCanvases(canvases);
    expect(wrapper
      .find(List)
      .find(Typography)
      .at(0)
      .render()
      .text()).toBe(idsAndLabels[0].label);

    expect(wrapper
      .find(List)
      .find(Typography)
      .at(1)
      .render()
      .text()).toBe(idsAndLabels[1].label);
  });

  it('should call the onClick handler of a list item', () => {
    const wrapper = createWrapper({ setCanvas });
    wrapper.find(ListItem).at(1).simulate('click');
    expect(setCanvas).toHaveBeenCalledTimes(1);
  });
});
