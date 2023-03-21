import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { ScrollTo } from '../../../src/components/ScrollTo';

describe('ScrollTo', () => {
  let containerRef;

  const containerBoundingRect = { bottom: 500, height: 440, top: 0 };
  let scrollTo;
  beforeEach(() => {
    scrollTo = jest.fn();
    containerRef = createRef();
    render(<div data-testid="container" ref={containerRef} />);

    containerRef.current.domEl = {
      getBoundingClientRect: () => containerBoundingRect,
      getElementsByClassName: () => [{ scrollTo }],
    };
  });

  const scrollToElAboveBoundingRect = { bottom: -200, top: -300 };
  const scrollToElBelowBoundingRect = { bottom: 601, top: 501 };
  const visibleScrollToElBoundingRect = { bottom: 300, top: 200 };

  it('wraps the given children in a div element', () => {
    render(<ScrollTo data-testid="subject" scrollTo>Child Prop</ScrollTo>);

    expect(screen.getByTestId('subject')).toHaveTextContent('Child Prop');
  });

  describe('when updating the scrollTo prop', () => {
    beforeEach(() => {
      jest.spyOn(ScrollTo.prototype, 'elementToScrollTo').mockImplementation(() => ({ offsetTop: 450 }));
    });
    describe('when setting from true to false', () => {
      it('does not scroll to the selected element', () => {
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...scrollToElAboveBoundingRect,
        }));

        const { rerender } = render(<ScrollTo scrollTo containerRef={containerRef}>Child</ScrollTo>);

        // It is called once when initially rendered w/ true
        expect(scrollTo).toHaveBeenCalled();
        scrollTo.mockReset();

        rerender(<ScrollTo containerRef={containerRef}>Child</ScrollTo>);

        // But it is not called on the re-render w/ false
        expect(scrollTo).not.toHaveBeenCalled();
      });
    });

    describe('when set from false to true', () => {
      it('scrolls to the selected element when it is hidden above the container', () => {
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...scrollToElAboveBoundingRect,
        }));
        const { rerender } = render(<ScrollTo containerRef={containerRef}>Child</ScrollTo>);

        rerender(<ScrollTo scrollTo containerRef={containerRef}>Child</ScrollTo>);

        expect(scrollTo).toHaveBeenCalledWith(0, 230);
      });

      it('scrolls to the selected element when it is hidden below the container', () => {
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...scrollToElBelowBoundingRect,
        }));

        const { rerender } = render(<ScrollTo containerRef={containerRef}>Child</ScrollTo>);

        rerender(<ScrollTo scrollTo containerRef={containerRef}>Child</ScrollTo>);

        expect(scrollTo).toHaveBeenCalledWith(0, 230);
      });

      it('does not scroll to the selected element when it is visible', () => {
        jest.spyOn(ScrollTo.prototype, 'scrollToBoundingRect').mockImplementation(() => ({
          ...visibleScrollToElBoundingRect,
        }));

        const { rerender } = render(<ScrollTo containerRef={containerRef}>Child</ScrollTo>);

        rerender(<ScrollTo scrollTo containerRef={containerRef}>Child</ScrollTo>);

        expect(scrollTo).not.toHaveBeenCalled();
      });
    });
  });
});
