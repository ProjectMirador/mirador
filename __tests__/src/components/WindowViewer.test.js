import React from 'react';
import { shallow } from 'enzyme';
import manifesto from 'manifesto.js';
import { WindowViewer } from '../../../src/components/WindowViewer';
import OSDViewer from '../../../src/containers/OpenSeadragonViewer';
import ViewerNavigation from '../../../src/containers/ViewerNavigation';
import ZoomControls from '../../../src/containers/ZoomControls';
import fixture from '../../fixtures/version-2/019.json';
import emptyCanvasFixture from '../../fixtures/version-2/emptyCanvas.json';
import otherContentFixture from '../../fixtures/version-2/299843.json';

let mockManifest = {
  id: 123,
  manifestation: manifesto.create(fixture),
};

let mockWindow = {
  canvasIndex: 0,
  view: 'single',
};

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowViewer
      infoResponses={{}}
      fetchInfoResponse={() => {}}
      fetchAnnotation={() => {}}
      manifest={mockManifest}
      window={mockWindow}
      {...props}
    />,
  );
}

describe('WindowViewer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper();
  });
  it('renders properly', () => {
    expect(wrapper.matchesElement(
      <>
        <OSDViewer>
          <div>
            <ZoomControls />
            <ViewerNavigation />
          </div>
        </OSDViewer>
      </>,
    )).toBe(true);
  });
  describe('currentCanvases', () => {
    it('by default returns a single canvas', () => {
      expect(wrapper.instance().currentCanvases().length).toEqual(1);
    });
    describe('book view', () => {
      it('when the first canvas is selected', () => {
        wrapper = createWrapper({ window: { view: 'book', canvasIndex: 0 } });
        expect(wrapper.instance().currentCanvases().length).toEqual(1);
      });
      it('when the second canvas is selected', () => {
        wrapper = createWrapper({ window: { view: 'book', canvasIndex: 1 } });
        expect(wrapper.instance().currentCanvases().length).toEqual(2);
      });
    });
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
            window: { view: 'book', canvasIndex: 1 },
          },
        );
        expect(wrapper.instance().currentInfoResponses().length).toEqual(1);
      });
      it('infoResponse is undefined', () => {
        wrapper = createWrapper(
          {
            infoResponses: {
              'https://stacks.stanford.edu/image/iiif/fr426cg9537%2FSC1094_s3_b14_f17_Cats_1976_0005/info.json': {
                isFetching: false,
              },
              foo: {
                isFetching: false,
              },
            },
            window: { view: 'book', canvasIndex: 1 },
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
                isFetching: false,
                error: 'yikes!',
              },
            },
            window: { view: 'book', canvasIndex: 1 },
          },
        );
        expect(wrapper.instance().currentInfoResponses().length).toEqual(1);
      });
    });
  });
  it('when view type changes', () => {
    expect(wrapper.instance().canvasGroupings.groupings().length).toEqual(3);
    wrapper.setProps({
      window: {
        canvasIndex: 0,
        view: 'book',
      },
    });
    expect(wrapper.instance().canvasGroupings.groupings().length).toEqual(2);
  });

  describe('componentDidMount', () => {
    it('does not call fetchInfoResponse for a canvas that has no images', () => {
      const mockFnCanvas0 = jest.fn();
      const mockFnCanvas2 = jest.fn();
      mockManifest = {
        id: 123,
        manifestation: manifesto.create(emptyCanvasFixture),
      };
      mockWindow = {
        canvasIndex: 0,
        view: 'single',
      };
      wrapper = createWrapper(
        { manifest: mockManifest, fetchInfoResponse: mockFnCanvas0, window: mockWindow },
      );
      expect(mockFnCanvas0).toHaveBeenCalledTimes(1);

      wrapper = createWrapper(
        {
          manifest: mockManifest,
          fetchInfoResponse: mockFnCanvas2,
          window: { canvasIndex: 2, view: 'single' },
        },
      );
      expect(mockFnCanvas2).toHaveBeenCalledTimes(0);
    });
    it('calls fetchAnnotation when otherContent is present', () => {
      const mockFnAnno = jest.fn();
      mockManifest = {
        id: 123,
        manifestation: manifesto.create(otherContentFixture),
      };
      wrapper = createWrapper(
        { manifest: mockManifest, fetchAnnotation: mockFnAnno },
      );
      expect(mockFnAnno).toHaveBeenCalledTimes(1);
    });
  });

  describe('componentDidUpdate', () => {
    it('does not call fetchInfoResponse for a canvas that has no images', () => {
      const mockFn = jest.fn();
      mockManifest = {
        id: 123,
        manifestation: manifesto.create(emptyCanvasFixture),
      };
      mockWindow = {
        canvasIndex: 2,
        view: 'single',
      };
      wrapper = createWrapper(
        { manifest: mockManifest, fetchInfoResponse: mockFn, window: mockWindow },
      );

      wrapper.setProps({ window: { canvasIndex: 3, view: 'single' } });

      expect(mockFn).toHaveBeenCalledTimes(0);
    });
  });
});
