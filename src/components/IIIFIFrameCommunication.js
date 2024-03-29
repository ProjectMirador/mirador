import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 *  Handle IIIF Auth token validation using iframe message events
 */
export function IIIFIFrameCommunication({ handleReceiveMessage, ...props }) {
  // Attaches the 'message' event listener to the window.
  useEffect(() => {
    if (!handleReceiveMessage) return undefined;

    window.addEventListener('message', handleReceiveMessage);

    // cleanup function
    return () => window.removeEventListener('message', handleReceiveMessage, false);
  }, [handleReceiveMessage]);

  return (
    // iframe "title" attribute is passed in via props for accessibility
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe
      {...props}
    />
  );
}

IIIFIFrameCommunication.propTypes = {
  'aria-hidden': PropTypes.bool,
  frameBorder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleReceiveMessage: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  scrolling: PropTypes.string,
  src: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

IIIFIFrameCommunication.defaultProps = {
  'aria-hidden': true,
  frameBorder: 0,
  handleReceiveMessage: undefined,
  height: 1,
  name: undefined,
  scrolling: undefined,
  style: { visibility: 'hidden' },
  width: 1,
};
