import { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { InView } from 'react-intersection-observer';
import classNames from 'classnames';
import getThumbnail from '../lib/ThumbnailFactory';

/**
 * Uses InteractionObserver to "lazy" load canvas thumbnails that are in view.
 */
export class IIIFThumbnail extends Component {
  /** */
  static getUseableLabel(resource, index) {
    return (resource
      && resource.getLabel
      && resource.getLabel().length > 0)
      ? resource.getLabel().getValue()
      : String(index + 1);
  }

  /**
   */
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  /** */
  componentDidMount() {
    this.setState(state => ({ ...state, image: this.image() }));
  }

  /** */
  componentDidUpdate(prevProps) {
    const { maxHeight, maxWidth, resource } = this.props;

    if (
      prevProps.maxHeight !== maxHeight
      || prevProps.maxWidth !== maxWidth
      || prevProps.resource !== resource) {
        this.setState(state => ({ ...state, image: this.image() })); // eslint-disable-line
    }
  }

  /**
   * Handles the intersection (visibility) of a given thumbnail, by requesting
   * the image and then updating the state.
   */
  handleIntersection(inView, _entry) {
    const { loaded } = this.state;

    if (loaded || !inView) return;

    this.setState(state => ({ ...state, loaded: true }));
  }

  /**
   *
  */
  imageStyles() {
    const {
      maxHeight, maxWidth, style,
    } = this.props;

    const image = this.image();

    const styleProps = { height: 'auto', width: 'auto' };

    if (!image) return { ...style, height: maxHeight || 'auto', width: maxWidth || 'auto' };

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
    } else {
      // The thumbnail wasn't retrieved via an Image API service,
      // and its dimensions are not specified in the JSON-LD
      // (note that this may result in a blurry image)
      styleProps.width = maxWidth;
      styleProps.height = maxHeight;
    }

    return {
      ...styleProps,
      ...style,
    };
  }

  /** */
  image() {
    const {
      thumbnail, resource, maxHeight, maxWidth, thumbnailsConfig,
    } = this.props;

    if (thumbnail) return thumbnail;

    const image = getThumbnail(resource, { ...thumbnailsConfig, maxHeight, maxWidth });

    if (image && image.url) return image;

    return undefined;
  }

  /** */
  label() {
    const { label, resource } = this.props;

    return label || IIIFThumbnail.getUseableLabel(resource);
  }

  /**
   */
  render() {
    const {
      children,
      classes,
      imagePlaceholder,
      labelled,
      thumbnail,
      variant,
    } = this.props;

    const { image, loaded } = this.state;

    const { url: src = imagePlaceholder } = (loaded && (thumbnail || image)) || {};

    return (
      <div className={classNames(classes.root, { [classes[`${variant}Root`]]: variant })}>
        <InView as="span" onChange={this.handleIntersection}>
          <img
            alt=""
            role="presentation"
            src={src}
            style={this.imageStyles()}
            className={classes.image}
          />
        </InView>
        { labelled && (
          <div className={classNames(classes.label, { [classes[`${variant}Label`]]: variant })}>
            <Typography variant="caption" classes={{ root: classNames(classes.caption, { [classes[`${variant}Caption`]]: variant }) }}>
              {this.label()}
            </Typography>
          </div>
        )}
        {children}
      </div>
    );
  }
}

IIIFThumbnail.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string),
  imagePlaceholder: PropTypes.string,
  label: PropTypes.string,
  labelled: PropTypes.bool,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  resource: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  thumbnail: PropTypes.shape({
    height: PropTypes.number,
    url: PropTypes.string.isRequired,
    width: PropTypes.number,
  }),
  thumbnailsConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  variant: PropTypes.oneOf(['inside', 'outside']),
};

IIIFThumbnail.defaultProps = {
  children: null,
  classes: {},
  // Transparent "gray"
  imagePlaceholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMDQmtBwADgwF/Op8FmAAAAABJRU5ErkJggg==',
  label: undefined,
  labelled: false,
  maxHeight: null,
  maxWidth: null,
  style: {},
  thumbnail: null,
  thumbnailsConfig: {},
  variant: null,
};
