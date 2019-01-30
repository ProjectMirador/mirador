import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IntersectionObserver from '@researchgate/react-intersection-observer';

/**
 * Uses InteractionObserver to "lazy" load canvas thumbnails that are in view.
 */
export default class CanvasThumbnail extends Component {
  /**
   */
  constructor(props) {
    super(props);
    this.state = { loaded: false, image: null };
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  /**
   * Handles the intersection (visibility) of a given thumbnail, by requesting
   * the image and then updating the state.
   */
  handleIntersection(event) {
    const { imageUrl } = this.props;
    const { loaded } = this.state;
    if (loaded) return;
    const image = new Image();
    image.src = imageUrl;
    this.setState({
      loaded: true,
      image,
    });
  }

  /**
   */
  render() {
    const { height } = this.props;
    const { loaded, image } = this.state;
    return (
      <div>
        <IntersectionObserver onChange={this.handleIntersection}>
          <img
            alt=""
            src={loaded ? image.src : CanvasThumbnail.defaultImgPlaceholder}
            height={height}
            width="100%"
          />
        </IntersectionObserver>
      </div>
    );
  }
}

// Transparent "gray"
CanvasThumbnail.defaultImgPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMDQmtBwADgwF/Op8FmAAAAABJRU5ErkJggg==';


CanvasThumbnail.propTypes = {
  imageUrl: PropTypes.string,
  height: PropTypes.number,
};

CanvasThumbnail.defaultProps = {
  imageUrl: null,
  height: 150,
};
