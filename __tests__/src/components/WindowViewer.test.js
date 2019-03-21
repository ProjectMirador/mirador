import React from 'react';
import { shallow } from 'enzyme';
import manifesto from 'manifesto.js';
import { WindowViewer } from '../../../src/components/WindowViewer';
import OSDViewer from '../../../src/containers/OpenSeadragonViewer';
import WindowCanvasNavigationControls from '../../../src/containers/WindowCanvasNavigationControls';
import fixture from '../../fixtures/version-2/019.json';
import emptyCanvasFixture from '../../fixtures/version-2/emptyCanvas.json';
import otherContentFixture from '../../fixtures/version-2/299843.json';

let currentCanvases = manifesto.create(fixture).getSequences()[0].getCanvases();

let mockWindow = {
  canvasIndex: 0,
  view: 'single',
};

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowViewer
      canvasLabel="label"
      infoResponses={{}}
      fetchInfoResponse={() => {}}
      fetchAnnotation={() => {}}
      currentCanvases={[currentCanvases[1]]}
      window={mockWindow}
      {...props}
    />,
  );
}

describe('WindowViewer', () => {
  let wrapper;
  it('renders properly', () => {
    wrapper = createWrapper();
    expect(wrapper.matchesElement(
      <>
        <OSDViewer>
          <WindowCanvasNavigationControls />
        </OSDViewer>
      </>,
    )).toBe(true);
  });
  describe('currentInfoResponses', () => {
    describe('returns only available infoResponses', () => {
      it('isFetching is false', () => {
        wrapper = createWrapper(
          {
            infoResponses: {
              'https://stacks.stanford.edu/image/iiif/fr426cg9537%2FSC1094_s3_b14_f17_Cats_1976_0005/info.json': {
                isFetching: false,
              },
              'https://stacks.stanford.edu/image/iiif/rz176rt6531%2FPC0170_s3_Tree_Calendar_20081101_152516_0410/info.json': {
                isFetching: true,
              },
            },
            window: {
              canvasIndex: 1,
              view: 'book',
            },
          },
        );
        expect(wrapper.instance().currentInfoResponses().length).toEqual(1);
      });
      it('infoResponse is undefined', () => {
        wrapper = createWrapper(
          {
            infoResponses: {
              foo: {
                isFetching: false,
              },
              'https://stacks.stanford.edu/image/iiif/fr426cg9537%2FSC1094_s3_b14_f17_Cats_1976_0005/info.json': {
                isFetching: false,
              },
            },
            window: {
              canvasIndex: 1,
              view: 'book',
            },
          },
        );
        expect(wrapper.instance().currentInfoResponses().length).toEqual(1);
      });
      it('error is not present', () => {
        wrapper = createWrapper(
          {
            infoResponses: {
              'https://stacks.stanford.edu/image/iiif/fr426cg9537%2FSC1094_s3_b14_f17_Cats_1976_0005/info.json': {
                isFetching: false,
              },
              'https://stacks.stanford.edu/image/iiif/rz176rt6531%2FPC0170_s3_Tree_Calendar_20081101_152516_0410/info.json': {
                error: 'yikes!',
                isFetching: false,
              },
            },
            window: {
              canvasIndex: 1,
              view: 'book',
            },
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
      const canvases = manifesto.create(emptyCanvasFixture).getSequences()[0].getCanvases();

      currentCanvases = [canvases[0]];

      mockWindow = {
        canvasIndex: 0,
        view: 'single',
      };
      wrapper = createWrapper(
        {
          currentCanvases,
          fetchInfoResponse: mockFnCanvas0,
          window: mockWindow,
        },
      );
      expect(mockFnCanvas0).toHaveBeenCalledTimes(1);

      currentCanvases = [canvases[2]];
      wrapper = createWrapper(
        {
          currentCanvases,
          fetchInfoResponse: mockFnCanvas2,
          window: { canvasIndex: 2, view: 'single' },
        },
      );
      expect(mockFnCanvas2).toHaveBeenCalledTimes(0);
    });
    it('calls fetchAnnotation when otherContent is present', () => {
      const mockFnAnno = jest.fn();
      const canvases = manifesto.create(otherContentFixture).getSequences()[0].getCanvases();
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
      const canvases = manifesto.create(emptyCanvasFixture).getSequences()[0].getCanvases();
      currentCanvases = [canvases[2]];
      mockWindow = {
        canvasIndex: 2,
        view: 'single',
      };
      wrapper = createWrapper(
        { currentCanvases, fetchInfoResponse: mockFn, window: mockWindow },
      );

      wrapper.setProps({ currentCanvases: [canvases[3]], window: { canvasIndex: 3, view: 'single' } });

      expect(mockFn).toHaveBeenCalledTimes(0);
    });
  });
});
