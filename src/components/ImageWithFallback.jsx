import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FailedImageContext from '../contexts/FailedImageContext';

/**
 * A plain img element that renders a fallback node when the image fails to load.
 *
 * Reports failures through FailedImageContext like IIIFThumbnail/OpenSeadragonTileSource
 */
export function ImageWithFallback({ alt, fallback, src, ...props }) {
  const [hasError, setHasError] = useState(false);
  const { notifyFailure } = useContext(FailedImageContext);

  useEffect(() => {
    // src changing is an external prop signal, not something derivable from
    // this component's own render
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasError(false);
  }, [src]);

  if (hasError) return fallback;

  return (
    <img
      alt={alt}
      src={src}
      onError={() => {
        setHasError(true);
        notifyFailure(src);
      }}
      {...props}
    />
  );
}

ImageWithFallback.propTypes = {
  /** Alt text for the underlying img element. */
  alt: PropTypes.string.isRequired,
  /** Node rendered in place of the image when it fails to load. */
  fallback: PropTypes.node.isRequired,
  /** URL of the image to display. */
  src: PropTypes.string.isRequired,
};
