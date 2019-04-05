import React from 'react';
import { shallow } from 'enzyme';
import IntersectionObserver from '@researchgate/react-intersection-observer';
import { CanvasThumbnail } from '../../../../src/components/window/CanvasThumbnail';

/**
 * Helper function to create a shallow wrapper around CanvasThumbnail
 */
function createWrapper(props) {
  return shallow(
    <CanvasThumbnail
      imageUrl="https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/full/193,/0/default.jpg"
      {...props}
    />,
  );
}

describe('CanvasThumbnail', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders properly', () => {
    expect(wrapper.matchesElement(
      <>
        <IntersectionObserver onChange={wrapper.instance().handleIntersection}>
          <img alt="" />
        </IntersectionObserver>
      </>,
    )).toBe(true);
  });

  it('defaults using the placeholder image', () => {
    expect(wrapper.find('img').props().src).toMatch(/data:image\/png;base64/);
  });

  it('when handleIntersection is called, loads the image', () => {
    wrapper.instance().handleIntersection({ isIntersecting: true });
    expect(wrapper.find('img').props().src).toMatch(/stacks/);
  });

  it('can be constrained by maxHeight', () => {
    wrapper = createWrapper({ maxHeight: 500 });

    expect(wrapper.find('img').props().style).toMatchObject({ height: 500, width: 'auto' });
  });

  it('can be constrained by maxWidth', () => {
    wrapper = createWrapper({ maxWidth: 500 });

    expect(wrapper.find('img').props().style).toMatchObject({ height: 'auto', width: 500 });
  });

  it('can be constrained by maxWidth and maxHeight', () => {
    wrapper = createWrapper({ maxHeight: 400, maxWidth: 500 });

    expect(wrapper.find('img').props().style).toMatchObject({ height: 400, width: 500 });
  });

  it('can be constrained by maxWidth and maxHeight and a desired aspect ratio', () => {
    wrapper = createWrapper({
      aspectRatio: 2,
      maxHeight: 400,
      maxWidth: 500,
    });
    expect(wrapper.find('img').props().style).toMatchObject({ height: 250, width: 500 });

    wrapper = createWrapper({
      aspectRatio: 1,
      maxHeight: 400,
      maxWidth: 500,
    });
    expect(wrapper.find('img').props().style).toMatchObject({ height: 400, width: 400 });
  });
});
