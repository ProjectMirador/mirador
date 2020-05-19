import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'intersection-observer'; // polyfill needed for Safari
import Typography from '@material-ui/core/Typography';
import IntersectionObserver from '@researchgate/react-intersection-observer';
import classNames from 'classnames';

/**
 * Uses InteractionObserver to "lazy" load canvas thumbnails that are in view.
 */
export class IIIFThumbnail extends Component {
  /**
   */
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  /**
   *
  */
  imageStyles() {
    const {
      maxHeight, maxWidth, style, image,
    } = this.props;

    const styleProps = { height: 'auto', width: 'auto' };

    const { height: thumbHeight, width: thumbWidth } = image;
    if (thumbHeight && thumbWidth) {
      if ((maxHeight && (thumbHeight > maxHeight)) || (maxWidth && (thumbWidth > maxWidth))) {
        const aspectRatio = thumbWidth / thumbHeight;

        if (maxHeight && maxWidth) {
          if ((maxWidth / maxHeight) < aspectRatio) {
            styleProps.height = Math.round(maxWidth / aspectRatio);
            styleProps.width = maxWidth;
          } else {
            styleProps.height = maxHeight;
            styleProps.width = Math.round(maxHeight * aspectRatio);
          }
        } else if (maxHeight) {
          styleProps.height = maxHeight;
          styleProps.maxWidth = Math.round(maxHeight * aspectRatio);
        } else if (maxWidth) {
          styleProps.width = maxWidth;
          styleProps.maxHeight = Math.round(maxWidth / aspectRatio);
        }
      } else {
        styleProps.width = thumbWidth;
        styleProps.height = thumbHeight;
      }
    } else if (thumbHeight && !thumbWidth) {
      styleProps.height = maxHeight;
    } else if (!thumbHeight && thumbWidth) {
      styleProps.width = maxWidth;
    }

    return {
      ...styleProps,
      ...style,
    };
  }

  /**
   * Handles the intersection (visibility) of a given thumbnail, by requesting
   * the image and then updating the state.
   */
  handleIntersection(event) {
    const { loaded } = this.state;

    if (loaded || !event.isIntersecting) return;

    this.setState({
      loaded: true,
    });
  }

  /**
   */
  render() {
    const {
      children,
      classes,
      image,
      label,
      labelled,
      variant,
    } = this.props;

    const { loaded } = this.state;

    return (
      <div className={classNames(classes.root, { [classes[`${variant}Root`]]: variant })}>
        <IntersectionObserver onChange={this.handleIntersection}>
          <img
            alt=""
            role="presentation"
            src={(loaded && image.url) || IIIFThumbnail.defaultImgPlaceholder}
            style={this.imageStyles()}
            className={classes.image}
          />
        </IntersectionObserver>
        { labelled && label && (
          <div className={classNames(classes.label, { [classes[`${variant}Label`]]: variant })}>
            <Typography variant="caption" classes={{ root: classNames(classes.caption, { [classes[`${variant}Caption`]]: variant }) }}>
              {label}
            </Typography>
          </div>
        )}
        {children}
      </div>
    );
  }
}

// Transparent "gray"
IIIFThumbnail.defaultImgPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMDQmtBwADgwF/Op8FmAAAAABJRU5ErkJggg==';

IIIFThumbnail.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string),
  image: PropTypes.shape({
    height: PropTypes.number,
    url: PropTypes.string.isRequired,
    width: PropTypes.number,
  }).isRequired,
  label: PropTypes.string,
  labelled: PropTypes.bool,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  variant: PropTypes.oneOf(['inside', 'outside']),
};

IIIFThumbnail.defaultProps = {
  children: null,
  classes: {},
  label: undefined,
  labelled: false,
  maxHeight: null,
  maxWidth: null,
  style: {},
  variant: null,
};
