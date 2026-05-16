import { useState } from "react";
import PropTypes from "prop-types";

/**
 * A plain img element that renders a fallback node when the image fails to load.
 */
export function ImageWithFallback({ alt, fallback, src, ...props }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) return fallback;

  return (
    <img alt={alt} src={src} onError={() => setHasError(true)} {...props} />
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
