import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import { ThumbnailCanvasGrouping } from '../../../src/components/ThumbnailCanvasGrouping';
import CaptionedCanvasThumbnail from '../../../src/containers/CaptionedCanvasThumbnail';
import CanvasGroupings from '../../../src/lib/CanvasGroupings';
import manifestJson from '../../fixtures/version-2/019.json';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <ThumbnailCanvasGrouping
      index={1}
      currentCanvasId="https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1"
      classes={{}}
      style={{
        height: 90,
        width: 100,
      }}
      {...props}
    />,
  );
}

describe('ThumbnailCanvasGrouping', () => {
  let wrapper;
  let rightWrapper;
  let setCanvas;
  const data = {
    canvasGroupings: new CanvasGroupings(Utils.parseManifest(manifestJson)
      .getSequences()[0].getCanvases()),
    height: 131,
    position: 'far-bottom',
  };
  beforeEach(() => {
    setCanvas = jest.fn();
    wrapper = createWrapper({ data, setCanvas });
  });
  it('renders', () => {
    expect(wrapper.find('.mirador-thumbnail-nav-container').length).toEqual(1);
  });
  it('sets a mirador-current-canvas-grouping class on current canvas', () => {
    expect(wrapper.find('.mirador-thumbnail-nav-canvas-1.mirador-current-canvas-grouping').length).toEqual(1);
  });
  it('renders a CaptionedCanvasThumbnail', () => {
    expect(wrapper.find(CaptionedCanvasThumbnail).length).toEqual(1);
  });
  it('when clicked, updates the current canvas', () => {
    wrapper = createWrapper({ data, index: 0, setCanvas });
    wrapper.find('.mirador-thumbnail-nav-canvas-0').simulate('click', { currentTarget: { dataset: { canvasId: 'info:0' } } });
    expect(setCanvas).toHaveBeenCalledWith('info:0');
  });
  describe('attributes based off far-bottom position', () => {
    it('in button div', () => {
      expect(wrapper.find('.mirador-thumbnail-nav-canvas').first().props().style).toEqual(
        expect.objectContaining({
          height: '123px',
          width: 'auto',
        }),
      );
    });
  });
  describe('attributes based off far-right position', () => {
    beforeEach(() => {
      rightWrapper = createWrapper({
        data: {
          ...data,
          position: 'far-right',
        },
        setCanvas,
      });
    });
    it('in button div', () => {
      expect(rightWrapper.find('.mirador-thumbnail-nav-canvas').first().props().style).toEqual(
        expect.objectContaining({
          height: 'auto',
          width: '100px',
        }),
      );
    });
  });
});
