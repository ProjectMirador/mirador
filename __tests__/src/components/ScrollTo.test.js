import React from 'react';
import { shallow } from 'enzyme';
import { ScrollTo } from '../../../src/components/ScrollTo';

/** Utility function to wrap ScrollTo */
function createWrapper(props) {
  return shallow(
    <ScrollTo
      containerRef={() => {}}
      scrollTo
      {...props}
    >
      Child Prop
    </ScrollTo>,
  );
}

describe('ScrollTo', () => {
  let wrapper;
  const scrollToElAboveBoundingRect = { bottom: -200, top: -300 };
  const scrollToElBelowBoundingRect = { bottom: 601, top: 501 };
  const visibleScrollToElBoundingRect = { bottom: 300, top: 200 };
  const containerBoundingRect = { bottom: 500, height: 440, top: 0 };

  it('wraps the given children in a div element', () => {
    wrapper = createWrapper();
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('div').children().text()).toEqual('Child Prop');
  });

  describe('when updating the scrollTo prop', () => {
    describe('when setting from true to false', () => {
      it('does not scroll to the selected element', () => {
        const scrollTo = jest.fn();
        jest.spyOn(ScrollTo.prototype, 'elementToScrollTo').mockImplementation(() => ({ offsetTop: 450 }));
        jest.spyOn(ScrollTo.prototype, 'scrollabelContainer').mockImplementation(() => ({ scrollTo }));
        jest.spyOn(ScrollTo.prototype, 'containerBoundingRect').mockImplementation(() => ({
          ...containerBoundingRect,
        }));
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...scrollToElAboveBoundingRect,
        }));
        wrapper = createWrapper();
        wrapper.setProps({ scrollTo: false });

        // It is called once when initially rendered w/ true
        expect(scrollTo).not.toHaveBeenCalledTimes(2);
      });
    });

    describe('when set from false to true', () => {
      it('scrolls to the selected element when it is hidden above the container', () => {
        const scrollTo = jest.fn();
        jest.spyOn(ScrollTo.prototype, 'elementToScrollTo').mockImplementation(() => ({ offsetTop: 450 }));
        jest.spyOn(ScrollTo.prototype, 'scrollabelContainer').mockImplementation(() => ({ scrollTo }));
        jest.spyOn(ScrollTo.prototype, 'containerBoundingRect').mockImplementation(() => ({
          ...containerBoundingRect,
        }));
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...scrollToElAboveBoundingRect,
        }));
        wrapper = createWrapper({ scrollTo: false });
        wrapper.setProps({ scrollTo: true });

        expect(scrollTo).toHaveBeenCalledWith(0, 230);
      });

      it('scrolls to the selected element when it is hidden above the container', () => {
        const scrollTo = jest.fn();
        jest.spyOn(ScrollTo.prototype, 'elementToScrollTo').mockImplementation(() => ({ offsetTop: 450 }));
        jest.spyOn(ScrollTo.prototype, 'scrollabelContainer').mockImplementation(() => ({ scrollTo }));
        jest.spyOn(ScrollTo.prototype, 'containerBoundingRect').mockImplementation(() => ({
          ...containerBoundingRect,
        }));
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...scrollToElBelowBoundingRect,
        }));
        wrapper = createWrapper({ scrollTo: false });
        wrapper.setProps({ scrollTo: true });

        expect(scrollTo).toHaveBeenCalledWith(0, 230);
      });

      it('does not scroll to the selected element when it is visible', () => {
        const scrollTo = jest.fn();
        jest.spyOn(ScrollTo.prototype, 'elementToScrollTo').mockImplementation(() => ({ offsetTop: 450 }));
        jest.spyOn(ScrollTo.prototype, 'scrollabelContainer').mockImplementation(() => ({ scrollTo }));
        jest.spyOn(ScrollTo.prototype, 'containerBoundingRect').mockImplementation(() => ({
          ...containerBoundingRect,
        }));
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...visibleScrollToElBoundingRect,
        }));
        wrapper = createWrapper({ scrollTo: false });
        wrapper.setProps({ scrollTo: true });

        expect(scrollTo).not.toHaveBeenCalled();
      });
    });
  });
});
