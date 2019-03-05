import React from 'react';
import { shallow } from 'enzyme';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import manifesto from 'manifesto.js';
import { WindowSideBarCanvasPanel } from '../../../src/components/WindowSideBarCanvasPanel';
import manifestJson from '../../fixtures/version-2/019.json';
import { getIdAndLabelOfCanvases } from '../../../src/state/selectors';

describe('WindowSideBarCanvasPanel', () => {
  let wrapper;
  let setCanvas;
  let canvases;

  beforeEach(() => {
    setCanvas = jest.fn();
    canvases = manifesto.create(manifestJson).getSequences()[0].getCanvases();

    wrapper = shallow(
      <WindowSideBarCanvasPanel
        id="asdf"
        canvases={canvases}
        classes={{}}
        t={key => key}
        windowId="xyz"
        setCanvas={setCanvas}
        config={{ canvasNavigation: { height: 100 } }}
      />,
    );
  });

  it('renders all needed elements', () => {
    expect(wrapper.props().title).toBe('canvasIndex');
    expect(wrapper.find(List).length).toBe(1);
    expect(wrapper.find(ListItem).length).toBe(3);
    expect(wrapper.find(ListItem).first().props().component).toEqual('li');
    expect(wrapper.find(List).find(Typography).length).toBe(3);
  });

  it('should set the correct labels', () => {
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
    wrapper.find(ListItem).at(1).simulate('click');
    expect(setCanvas).toHaveBeenCalledTimes(1);
  });
});
