import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FailedImageContext from '../contexts/FailedImageContext';

/* Abstract away implementation details for falling back on error */
function InternalImageWithFallback({ alt, onError = () => {}, fallback, src, ...props }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) return fallback;

  return (
    <img
      alt={alt}
      src={src}
      onError={() => {
        setHasError(true);
        onError(src);
      }}
      {...props}
    />
  );
}

InternalImageWithFallback.propTypes = {
  alt: PropTypes.string.isRequired,
  onError: PropTypes.func,
  fallback: PropTypes.node.isRequired,
  src: PropTypes.string.isRequired,
};

/**
 * A plain img element that renders a fallback node when the image fails to load.
 *
 * Reports failures through FailedImageContext like IIIFThumbnail/OpenSeadragonTileSource
 */
export function ImageWithFallback({ alt, fallback, src, ...props }) {
  const { notifyFailure } = useContext(FailedImageContext);

  return <InternalImageWithFallback alt={alt} onError={notifyFailure} fallback={fallback} key={src} src={src} {...props} />;
}

ImageWithFallback.propTypes = {
  /** Alt text for the underlying img element. */
  alt: PropTypes.string.isRequired,
  /** Node rendered in place of the image when it fails to load. */
  fallback: PropTypes.node.isRequired,
  /** URL of the image to display. */
  src: PropTypes.string.isRequired,
};
