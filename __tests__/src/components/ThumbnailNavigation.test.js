import React from 'react';
import { shallow } from 'enzyme';
import manifesto from 'manifesto.js';
import { ThumbnailNavigation } from '../../../src/components/ThumbnailNavigation';
import CanvasGroupings from '../../../src/lib/CanvasGroupings';
import manifestJson from '../../fixtures/version-2/019.json';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <ThumbnailNavigation
      canvasGroupings={
        new CanvasGroupings(manifesto.create(manifestJson).getSequences()[0].getCanvases())
      }
      classes={{}}
      window={{
        canvasIndex: 1,
        id: 'foobar',
      }}
      config={{ thumbnailNavigation: { height: 150, width: 200 } }}
      position="far-bottom"
      t={k => k}
      {...props}
    />,
  );
}

describe('ThumbnailNavigation', () => {
  let wrapper;
  let setCanvas;
  beforeEach(() => {
    setCanvas = jest.fn();
    wrapper = createWrapper({ setCanvas });
  });
  it('renders the component', () => {
    // console.log(wrapper.debug());
    expect(wrapper.find('.mirador-thumb-navigation').length).toBe(1);
  });
  it('renders containers based off of number of canvases', () => {
    expect(wrapper.find('.mirador-thumbnail-nav-canvas').length).toBe(3);
  });
  it('sets a mirador-current-canvas class on current canvas', () => {
    expect(wrapper.find('.mirador-thumbnail-nav-canvas-1.mirador-current-canvas'));
  });
  it('renders the canvas labels for each canvas in a GridListTileBar', () => {
    expect(wrapper.find('.mirador-canvas-thumb-label').length).toBe(3);
    const firstTitle = wrapper.find('.mirador-canvas-thumb-label')
      .first().find('WithStyles(Typography)').dive()
      .find('Typography')
      .dive();
    expect(firstTitle.text()).toEqual('Test 19 Canvas: 1');
  });
  it('when clicked, updates the current canvas', () => {
    wrapper.find('.mirador-thumbnail-nav-canvas-0').simulate('click');
    expect(setCanvas).toHaveBeenCalledWith('foobar', 0);
  });
  it('renders canvas thumbnails', () => {
    expect(wrapper.find('CanvasThumbnail').length).toBe(3);
  });
  it('renders containers based off of canvas groupings ', () => {
    wrapper = createWrapper({
      canvasGroupings: new CanvasGroupings(manifesto.create(manifestJson).getSequences()[0].getCanvases(), 'book'),
      setCanvas,
    });
    expect(wrapper.find('.mirador-thumbnail-nav-canvas').length).toBe(2);
    expect(wrapper.find('CanvasThumbnail').length).toBe(3);
  });
});
