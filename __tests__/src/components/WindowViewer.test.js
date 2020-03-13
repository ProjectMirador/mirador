import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import { WindowViewer } from '../../../src/components/WindowViewer';
import OSDViewer from '../../../src/containers/OpenSeadragonViewer';
import WindowCanvasNavigationControls from '../../../src/containers/WindowCanvasNavigationControls';
import fixture from '../../fixtures/version-2/019.json';
import emptyCanvasFixture from '../../fixtures/version-2/emptyCanvas.json';
import otherContentFixture from '../../fixtures/version-2/299843.json';

let currentCanvases = Utils.parseManifest(fixture).getSequences()[0].getCanvases();

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowViewer
      canvasIndex={0}
      canvasLabel="label"
      infoResponses={{}}
      fetchInfoResponse={() => {}}
      fetchAnnotation={() => {}}
      currentCanvases={[currentCanvases[1]]}
      view="single"
      windowId="xyz"
      {...props}
    />,
  );
}

describe('WindowViewer', () => {
  let wrapper;
  it('renders properly', () => {
    wrapper = createWrapper();
    expect(wrapper.matchesElement(
      <OSDViewer>
        <WindowCanvasNavigationControls />
      </OSDViewer>,
    )).toBe(true);
  });
  describe('currentInfoResponses', () => {
    describe('returns only available infoResponses', () => {
      it('isFetching is false', () => {
        wrapper = createWrapper(
          {
            currentCanvasId: 1,
            infoResponses: {
              'https://stacks.stanford.edu/image/iiif/fr426cg9537%2FSC1094_s3_b14_f17_Cats_1976_0005': {
                isFetching: false,
              },
              'https://stacks.stanford.edu/image/iiif/rz176rt6531%2FPC0170_s3_Tree_Calendar_20081101_152516_0410': {
                isFetching: true,
              },
            },
            view: 'book',
          },
        );
        expect(wrapper.instance().currentInfoResponses().length).toEqual(1);
      });
      it('infoResponse is undefined', () => {
        wrapper = createWrapper(
          {
            currentCanvasId: 1,
            infoResponses: {
              foo: {
                isFetching: false,
              },
              'https://stacks.stanford.edu/image/iiif/fr426cg9537%2FSC1094_s3_b14_f17_Cats_1976_0005': {
                isFetching: false,
              },
            },
            view: 'book',
          },
        );
        expect(wrapper.instance().currentInfoResponses().length).toEqual(1);
      });
      it('error is not present', () => {
        wrapper = createWrapper(
          {
            currentCanvasId: 1,
            infoResponses: {
              'https://stacks.stanford.edu/image/iiif/fr426cg9537%2FSC1094_s3_b14_f17_Cats_1976_0005': {
                isFetching: false,
              },
              'https://stacks.stanford.edu/image/iiif/rz176rt6531%2FPC0170_s3_Tree_Calendar_20081101_152516_0410': {
                error: 'yikes!',
                isFetching: false,
              },
            },
            view: 'book',
          },
        );
        expect(wrapper.instance().currentInfoResponses().length).toEqual(1);
      });
    });
  });

  describe('componentDidMount', () => {
    it('does not call fetchInfoResponse for a canvas that has no images', () => {
      const mockFnCanvas0 = jest.fn();
      const mockFnCanvas2 = jest.fn();
      const canvases = Utils.parseManifest(emptyCanvasFixture).getSequences()[0].getCanvases();

      currentCanvases = [canvases[0]];

      wrapper = createWrapper(
        {
          currentCanvases,
          currentCanvasId: 0,
          fetchInfoResponse: mockFnCanvas0,
          view: 'single',
        },
      );
      expect(mockFnCanvas0).toHaveBeenCalledTimes(1);

      currentCanvases = [canvases[2]];
      wrapper = createWrapper(
        {
          currentCanvases,
          currentCanvasId: 2,
          fetchInfoResponse: mockFnCanvas2,
          view: 'single',
        },
      );
      expect(mockFnCanvas2).toHaveBeenCalledTimes(0);
    });
    it('calls fetchAnnotation when otherContent is present', () => {
      const mockFnAnno = jest.fn();
      const canvases = Utils.parseManifest(otherContentFixture).getSequences()[0].getCanvases();
      currentCanvases = [canvases[0]];

      wrapper = createWrapper(
        { currentCanvases, fetchAnnotation: mockFnAnno },
      );
      expect(mockFnAnno).toHaveBeenCalledTimes(1);
    });
  });

  describe('componentDidUpdate', () => {
    it('does not call fetchInfoResponse for a canvas that has no images', () => {
      const mockFn = jest.fn();
      const canvases = Utils.parseManifest(emptyCanvasFixture).getSequences()[0].getCanvases();
      currentCanvases = [canvases[2]];
      wrapper = createWrapper(
        {
          currentCanvases,
          currentCanvasId: 2,
          fetchInfoResponse: mockFn,
          view: 'single',
        },
      );

      wrapper.setProps({ currentCanvases: [canvases[3]], currentCanvasId: 3, view: 'single' });

      expect(mockFn).toHaveBeenCalledTimes(0);
    });
  });
});
