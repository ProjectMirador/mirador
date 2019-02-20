import React from 'react';
import { shallow } from 'enzyme';
import manifesto from 'manifesto.js';
import WindowViewer from '../../../src/components/WindowViewer';
import OSDViewer from '../../../src/containers/OpenSeadragonViewer';
import ViewerNavigation from '../../../src/containers/ViewerNavigation';
import fixture from '../../fixtures/version-2/019.json';

const mockManifest = {
  id: 123,
  manifestation: manifesto.create(fixture),
};

const mockWindow = {
  canvasIndex: 0,
  view: 'single',
};

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowViewer
      infoResponses={{}}
      fetchInfoResponse={() => {}}
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
          <ViewerNavigation />
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
});
