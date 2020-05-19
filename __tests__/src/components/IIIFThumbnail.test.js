import React from 'react';
import { shallow } from 'enzyme';
import IntersectionObserver from '@researchgate/react-intersection-observer';
import Typography from '@material-ui/core/Typography';
import { IIIFThumbnail } from '../../../src/components/IIIFThumbnail';

/**
 * Helper function to create a shallow wrapper around IIIFThumbnail
 */
function createWrapper(props) {
  return shallow(
    <IIIFThumbnail
      {...props}
    />,
  );
}

describe('IIIFThumbnail', () => {
  let wrapper;
  const url = 'http://example.com/iiif/image';
  const image = { height: 120, url, width: 100 };
  beforeEach(() => {
    wrapper = createWrapper({ image });
  });

  it('renders properly', () => {
    expect(wrapper.matchesElement(
      <div>
        <IntersectionObserver onChange={wrapper.instance().handleIntersection}>
          <img alt="" />
        </IntersectionObserver>
      </div>,
    )).toBe(true);
  });

  it('defaults using the placeholder image', () => {
    expect(wrapper.find('img').props().src).toMatch(/data:image\/png;base64/);
  });

  it('when handleIntersection is called, loads the image', () => {
    wrapper.instance().handleIntersection({ isIntersecting: true });
    expect(wrapper.find('img').props().src).toEqual(url);
  });

  it('can be constrained by maxHeight', () => {
    wrapper = createWrapper({ image, maxHeight: 100 });

    expect(wrapper.find('img').props().style).toMatchObject({ height: 100, width: 83 });
  });

  it('can be constrained by maxWidth', () => {
    wrapper = createWrapper({ image, maxWidth: 80 });

    expect(wrapper.find('img').props().style).toMatchObject({ height: 96, width: 80 });
  });

  it('can be constrained by maxWidth and maxHeight', () => {
    wrapper = createWrapper({ image, maxHeight: 90, maxWidth: 50 });

    expect(wrapper.find('img').props().style).toMatchObject({ height: 60, width: 50 });
  });

  it('relaxes constraints when the image dimensions are unknown', () => {
    wrapper = createWrapper({ image: { url } });
    expect(wrapper.find('img').props().style).toMatchObject({ height: 'auto', width: 'auto' });
  });

  it('constrains what it can when the image dimensions are unknown', () => {
    wrapper = createWrapper({ image: { height: 120, url }, maxHeight: 90 });
    expect(wrapper.find('img').props().style).toMatchObject({ height: 90, width: 'auto' });
  });

  it('renders a provided label', () => {
    wrapper = createWrapper({
      classes: { label: 'label' }, image, label: 'Some label', labelled: true,
    });
    expect(
      wrapper.find('div.label').at(0).matchesElement(
        <div className="label"><Typography>Some label</Typography></div>,
      ),
    ).toBe(true);
  });

  it('renders children', () => {
    wrapper = createWrapper({ children: <span id="hi" />, image });
    expect(wrapper.find('span').length).toEqual(1);
  });
});
