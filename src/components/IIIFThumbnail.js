import {
  Component, useMemo, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useInView } from 'react-intersection-observer';
import getThumbnail from '../lib/ThumbnailFactory';

const StyledRoot = styled('div')(() => ({

}));

const StyledLabel = styled('div')(() => ({

}));

/**
 * A lazy-loaded image that uses IntersectionObserver to determine when to
 * try to load the image (or even calculate that the image url/height/width are)
 */
const LazyLoadedImage = ({
  placeholder, style = {}, thumbnail, resource, maxHeight, maxWidth, thumbnailsConfig, ...props
}) => {
  const { ref, inView } = useInView();
  const [loaded, setLoaded] = useState(false);

  /**
   * Handles the intersection (visibility) of a given thumbnail, by requesting
   * the image and then updating the state.
   */
  useEffect(() => {
    if (loaded || !inView) return;

    setLoaded(true);
  }, [inView, loaded]);

  const image = useMemo(() => {
    if (thumbnail) return thumbnail;

    const i = getThumbnail(resource, { ...thumbnailsConfig, maxHeight, maxWidth });

    if (i && i.url) return i;

    return undefined;
  }, [resource, thumbnail, maxWidth, maxHeight, thumbnailsConfig]);

  const imageStyles = useMemo(() => {
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
  }, [image, maxWidth, maxHeight, style]);

  const { url: src = placeholder } = (loaded && (thumbnail || image)) || {};

  return (
    <img
      ref={ref}
      alt=""
      role="presentation"
      src={src}
      style={imageStyles}
      {...props}
    />
  );
};

const StyledLazyLoadedImage = styled(LazyLoadedImage)(() => ({

}));

LazyLoadedImage.propTypes = {
  maxHeight: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  resource: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  thumbnail: PropTypes.shape({
    height: PropTypes.number,
    url: PropTypes.string.isRequired,
    width: PropTypes.number,
  }),
  thumbnailsConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

LazyLoadedImage.defaultProps = {
  style: {},
  thumbnail: null,
  thumbnailsConfig: {},
};

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
      imagePlaceholder,
      labelled,
      imageStyle,
      maxHeight,
      maxWidth,
      resource,
      style,
      thumbnail,
      thumbnailsConfig,
      variant,
    } = this.props;

    return (
      <StyledRoot
        sx={{
          display: variant === 'inside' && 'inline-block',
          height: variant === 'inside' && 'inherit',
          position: variant === 'inside' && 'relative',
        }}
      >
        <StyledLazyLoadedImage
          placeholder={imagePlaceholder}
          thumbnail={thumbnail}
          resource={resource}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          thumbnailsConfig={thumbnailsConfig}
          style={style}
          sx={{
            borderBottom: imageStyle && '1px solid',
            borderBottomColor: imageStyle && 'divider',
          }}
        />

        { labelled && (
          <StyledLabel
            sx={{
              background: variant === 'inside' && 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              bottom: variant === 'inside' && '5px',
              boxSizing: variant === 'inside' && 'border-box',
              left: variant === 'inside' && '0px',
              overflow: 'hidden',
              padding: variant === 'inside' && '4px',
              position: variant === 'inside' && 'absolute',
              textOverflow: 'ellipsis',
              width: variant === 'inside' && '100%',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                boxOrient: variant === 'outside' && 'vertical',
                color: variant === 'inside' && '#ffffff',
                display: variant === 'outside' && '-webkit-box',
                lineClamp: variant === 'inside' ? '1' : '2',
                lineHeight: '1.5em',
                maxHeight: variant === 'outside' && '3em',
                whiteSpace: variant === 'inside' && 'nowrap',
                wordBreak: 'break-word',
              }}
            >
              {this.label()}
            </Typography>
          </StyledLabel>
        )}
        {children}
      </StyledRoot>
    );
  }
}

IIIFThumbnail.propTypes = {
  children: PropTypes.node,
  imagePlaceholder: PropTypes.string,
  imageStyle: PropTypes.bool,
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
  // Transparent "gray"
  imagePlaceholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMDQmtBwADgwF/Op8FmAAAAABJRU5ErkJggg==',
  imageStyle: false,
  label: undefined,
  labelled: false,
  maxHeight: null,
  maxWidth: null,
  style: {},
  thumbnail: null,
  thumbnailsConfig: {},
  variant: null,
};
