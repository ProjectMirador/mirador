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
      <>Child Prop</>
    </ScrollTo>,
  );
}

describe('ScrollTo', () => {
  let wrapper;
  const scrollToElAboveBoundingRect = { bottom: -200, top: -300 };
  const scrollToElBelowBoundingRect = { bottom: 601, top: 501 };
  const visibleScrollToElBoundingRect = { bottom: 300, top: 200 };
  const containerBoundingRect = { bottom: 500, top: 0 };

  it('wraps the given children in a RootRef element', () => {
    wrapper = createWrapper();

    expect(wrapper.find('RootRef').length).toBe(1);
    expect(wrapper.find('RootRef').children().text()).toEqual('Child Prop');
  });

  describe('when updating the scrollTo prop', () => {
    describe('when setting from true to false', () => {
      it('does not scroll to the selected element', () => {
        const scrollIntoView = jest.fn();
        jest.spyOn(ScrollTo.prototype, 'elementToScrollTo').mockImplementation(() => ({ scrollIntoView }));
        jest.spyOn(ScrollTo.prototype, 'containerBoundingRect').mockImplementation(() => ({
          ...containerBoundingRect,
        }));
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...scrollToElAboveBoundingRect,
        }));
        wrapper = createWrapper();
        wrapper.setProps({ scrollTo: false });

        // It is called once when initially rendered w/ true
        expect(scrollIntoView).not.toHaveBeenCalledTimes(2);
      });
    });

    describe('when set from false to true', () => {
      it('scrolls to the selected element when it is hidden above the container', () => {
        const scrollIntoView = jest.fn();
        jest.spyOn(ScrollTo.prototype, 'elementToScrollTo').mockImplementation(() => ({ scrollIntoView }));
        jest.spyOn(ScrollTo.prototype, 'containerBoundingRect').mockImplementation(() => ({
          ...containerBoundingRect,
        }));
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...scrollToElAboveBoundingRect,
        }));
        wrapper = createWrapper({ scrollTo: false });
        wrapper.setProps({ scrollTo: true });

        expect(scrollIntoView).toHaveBeenCalledWith({ block: 'center' });
      });

      it('scrolls to the selected element when it is hidden above the container', () => {
        const scrollIntoView = jest.fn();
        jest.spyOn(ScrollTo.prototype, 'elementToScrollTo').mockImplementation(() => ({ scrollIntoView }));
        jest.spyOn(ScrollTo.prototype, 'containerBoundingRect').mockImplementation(() => ({
          ...containerBoundingRect,
        }));
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...scrollToElBelowBoundingRect,
        }));
        wrapper = createWrapper({ scrollTo: false });
        wrapper.setProps({ scrollTo: true });

        expect(scrollIntoView).toHaveBeenCalledWith({ block: 'center' });
      });

      it('does not scroll to the selected element when it is visible', () => {
        const scrollIntoView = jest.fn();
        jest.spyOn(ScrollTo.prototype, 'elementToScrollTo').mockImplementation(() => ({ scrollIntoView }));
        jest.spyOn(ScrollTo.prototype, 'containerBoundingRect').mockImplementation(() => ({
          ...containerBoundingRect,
        }));
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...visibleScrollToElBoundingRect,
        }));
        wrapper = createWrapper({ scrollTo: false });
        wrapper.setProps({ scrollTo: true });

        expect(scrollIntoView).not.toHaveBeenCalled();
      });
    });
  });
});
