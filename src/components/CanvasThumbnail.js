import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'intersection-observer'; // polyfill needed for Safari
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
    const {
      height, isValid, onClick, style,
    } = this.props;
    const { loaded, image } = this.state;
    const imgStyle = { height, width: '100%', ...style };
    return (
      <IntersectionObserver onChange={this.handleIntersection}>
        <img
          alt=""
          onClick={onClick}
          onKeyPress={onClick}
          role="presentation"
          src={loaded && isValid ? image.src : CanvasThumbnail.defaultImgPlaceholder}
          style={imgStyle}
        />
      </IntersectionObserver>
    );
  }
}

// Transparent "gray"
CanvasThumbnail.defaultImgPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMDQmtBwADgwF/Op8FmAAAAABJRU5ErkJggg==';

CanvasThumbnail.propTypes = {
  imageUrl: PropTypes.string,
  isValid: PropTypes.bool,
  height: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types,
};

CanvasThumbnail.defaultProps = {
  imageUrl: null,
  isValid: true,
  height: 150,
  style: {},
};
