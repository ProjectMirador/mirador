import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import { ThumbnailNavigation } from '../../../src/components/ThumbnailNavigation';
import ThumbnailCanvasGrouping from '../../../src/containers/ThumbnailCanvasGrouping';
import CanvasGroupings from '../../../src/lib/CanvasGroupings';
import manifestJson from '../../fixtures/version-2/019.json';
import zeroWidthFixture from '../../fixtures/version-2/zeroWidthCanvas.json';

/** create wrapper */
function createWrapper(props, fixture = manifestJson) {
  return shallow(
    <ThumbnailNavigation
      canvasGroupings={
        new CanvasGroupings(Utils.parseManifest(fixture).getSequences()[0].getCanvases())
      }
      canvasIndex={1}
      classes={{}}
      windowId="foobar"
      config={{ thumbnailNavigation: { height: 150, width: 100 } }}
      position="far-bottom"
      t={k => k}
      {...props}
    />,
  );
}

describe('ThumbnailNavigation', () => {
  let wrapper;
  let rightWrapper;
  beforeEach(() => {
    wrapper = createWrapper();
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-thumb-navigation').length).toBe(1);
  });
  it('renders containers based off of number of canvases', () => {
    expect(wrapper
      .find('AutoSizer').dive().find('List').dive()
      .find(ThumbnailCanvasGrouping).length).toEqual(3);
  });
  it('has a ref set used to reset on view change', () => {
    expect(wrapper.instance().gridRef).not.toBe(null);
  });
  it('triggers a resetAfterIndex on view change', () => {
    const mockReset = jest.fn();
    wrapper.instance().gridRef = { current: { resetAfterIndex: mockReset } };
    wrapper.setProps({
      canvasIndex: 1,
      view: 'book',
    });
    expect(mockReset).toHaveBeenCalled();
  });
  it('triggers a scrollToItem on canvasIndex change', () => {
    const mockScroll = jest.fn();
    wrapper.instance().gridRef = { current: { scrollToItem: mockScroll } };
    wrapper.setProps({
      canvasIndex: 3,
    });
    expect(mockScroll).toHaveBeenCalled();
  });
  describe('calculating instance methods', () => {
    beforeEach(() => {
      rightWrapper = createWrapper({
        position: 'far-right',
      });
    });
    it('style', () => {
      expect(wrapper.instance().style()).toMatchObject({ height: '150px', width: '100%' });
      expect(rightWrapper.instance().style()).toMatchObject({ height: '100%', minHeight: 0, width: '123px' });
    });
    it('rightWidth', () => {
      expect(wrapper.instance().rightWidth()).toEqual(100);
      const mockReset = jest.fn();
      wrapper.instance().gridRef = { current: { resetAfterIndex: mockReset } };
      wrapper.setProps({
        canvasIndex: 1,
        view: 'book',
      });
      expect(wrapper.instance().rightWidth()).toEqual(200);
    });
    it('item count is based off of number of canvases', () => {
      expect(wrapper.instance().itemCount()).toEqual(3);
    });
    it('calculateScaledSize', () => {
      expect(wrapper.instance().calculateScaledSize(0)).toEqual(82);
      expect(rightWrapper.instance().calculateScaledSize(0)).toEqual(158);
      const zeroWidthWrapper = createWrapper({ position: 'far-right' }, zeroWidthFixture);
      expect(zeroWidthWrapper.instance().calculateScaledSize(0)).toEqual(108);
    });
    it('calculatingWidth', () => {
      expect(wrapper.instance().calculatingWidth(1)).toEqual(100);
      expect(wrapper.instance().calculatingWidth(2)).toEqual(200);
    });
    it('areaHeight', () => {
      expect(wrapper.instance().areaHeight()).toEqual(150);
      expect(rightWrapper.instance().areaHeight(99)).toEqual(99);
    });
  });
  describe('keyboard navigation', () => {
    const setNextCanvas = jest.fn();
    const setPreviousCanvas = jest.fn();
    beforeEach(() => {
      wrapper = createWrapper({
        canvasIndex: 1,
        hasNextCanvas: true,
        hasPreviousCanvas: true,
        setNextCanvas,
        setPreviousCanvas,
      });
    });
    describe('handleKeyUp', () => {
      it('handles right arrow by advancing the current canvas', () => {
        wrapper.instance().handleKeyUp({ key: 'ArrowRight' });
        expect(setNextCanvas).toHaveBeenCalled();
      });
      it('handles down arrow by advancing the current canvas when the canvas is on the right', () => {
        wrapper.setProps({ position: 'far-right' });
        wrapper.instance().handleKeyUp({ key: 'ArrowDown' });
        expect(setNextCanvas).toHaveBeenCalled();
      });
      it('handles left arrow by selecting the previous canvas', () => {
        wrapper.instance().handleKeyUp({ key: 'ArrowLeft' });
        expect(setPreviousCanvas).toHaveBeenCalled();
      });
      it('handles up arrow by selecting the previous canvas when the canvas is on the right', () => {
        wrapper.setProps({ position: 'far-right' });
        wrapper.instance().handleKeyUp({ key: 'ArrowUp' });
        expect(setPreviousCanvas).toHaveBeenCalled();
      });
    });
  });
  describe('when viewingDirection="right-to-left"', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        viewingDirection: 'right-to-left',
      });
    });

    it('sets up react-window to be rtl', () => {
      expect(wrapper
        .find('AutoSizer').dive().find('List').dive()
        .props().style.direction).toEqual('rtl');
    });
  });
});
