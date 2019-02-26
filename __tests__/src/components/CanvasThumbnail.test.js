import React from 'react';
import { shallow } from 'enzyme';
import IntersectionObserver from '@researchgate/react-intersection-observer';
import { CanvasThumbnail } from '../../../src/components/CanvasThumbnail';

describe('CanvasThumbnail', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <CanvasThumbnail
        imageUrl="https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/full/193,/0/default.jpg"
        onClick={() => {}}
      />,
    );
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
});
