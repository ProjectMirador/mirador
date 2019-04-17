import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RootRef from '@material-ui/core/RootRef';

/**
 * ScrollTo ~
*/
export class ScrollTo extends Component {
  /** */
  constructor(props) {
    super(props);

    this.scrollToRef = React.createRef();
  }

  /** */
  componentDidMount() {
    const { scrollTo } = this.props;
    if (!scrollTo) return;

    this.scrollToElement();
  }

  /**
   * If the scrollTo prop is true (and has been updated) scroll to the selected element
  */
  componentDidUpdate(prevProps) {
    const { scrollTo } = this.props;
    if (scrollTo && (prevProps.scrollTo !== scrollTo)) {
      this.scrollToElement();
    }
  }

  /**
   * Return the getBoundingClientRect() of the containerRef prop
  */
  containerBoundingRect() {
    const { containerRef } = this.props;

    if (!containerRef || !containerRef.current) return {};
    return containerRef.current.getBoundingClientRect();
  }

  /**
   * Return the getBoundingClientRect() of the scrollTo ref prop
  */
  scrollToBoundingRect() {
    if (!this.elementToScrollTo()) return {};
    return this.elementToScrollTo().getBoundingClientRect();
  }

  /**
   * Return the current scrollToRef
  */
  elementToScrollTo() {
    if (!this.scrollToRef || !this.scrollToRef.current) return null;

    return this.scrollToRef.current;
  }

  /**
   * Determine if the scrollTo element is visible within the given containerRef prop.
   * Currently only supports vertical elements but could be extended to support horizontal
  */
  elementIsVisible() {
    const { offsetTop } = this.props;

    if (this.scrollToBoundingRect().top < (this.containerBoundingRect().top + offsetTop)) {
      return false;
    } if (this.scrollToBoundingRect().bottom > this.containerBoundingRect().bottom) {
      return false;
    }

    return true;
  }

  /**
   * Scroll to the element if it is set to be scolled and is not visible
  */
  scrollToElement() {
    const { scrollTo } = this.props;
    if (!scrollTo) return;
    if (!this.elementToScrollTo()) return;
    if (this.elementIsVisible()) return;

    this.elementToScrollTo().scrollIntoView({ block: 'center' });
  }

  /**
   * Returns the rendered component
  */
  render() {
    const { children, scrollTo } = this.props;

    if (!scrollTo) return children;

    return (
      <RootRef rootRef={this.scrollToRef}>
        {children}
      </RootRef>
    );
  }
}

ScrollTo.propTypes = {
  children: PropTypes.node.isRequired,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  offsetTop: PropTypes.number,
  scrollTo: PropTypes.bool.isRequired,
};

ScrollTo.defaultProps = {
  offsetTop: 0,
};
