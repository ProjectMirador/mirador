import { useEffect } from 'react';
import PropTypes from 'prop-types';

/** This component is heavily based on the IComCom library
 * See https://github.com/infinum/icomcom-react
 */
export function IIIFIFrameCommunication({ handleReceiveMessage, ...props}) {
  const _frame = useRef(null);

  // Attaches the 'message' event listener to the window.
  useEffect(() => {
    // make sure we have the handle function from props, and pass in the event
    /** */
    function onReceiveMessage(event) {
      if (handleReceiveMessage) {
        handleReceiveMessage(event);
      }
    }

    window.addEventListener('message', onReceiveMessage);

    // cleanup function
    return () => window.removeEventListener('message', onReceiveMessage, false);
  }, [handleReceiveMessage]);

  return (
    // iframe "title" attribute is passed in via props for accessibility
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe
      ref={_frame}
      {...props}
    />
  );
}

IIIFIFrameCommunication.propTypes = {
  ariaHidden: PropTypes.bool,
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
  ariaHidden: true,
  frameBorder: 0,
  handleReceiveMessage: undefined,
  height: 1,
  name: undefined,
  scrolling: undefined,
  style: { visibility: 'hidden' },
  width: 1,
};
