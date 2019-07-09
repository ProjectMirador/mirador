import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 *
 */
export class IframeComm extends Component {
  /**
   *
   */
  constructor() {
    super();
    this.onReceiveMessage = this.onReceiveMessage.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    window.addEventListener('message', this.onReceiveMessage);
    this.frame.addEventListener('load', this.onLoad);
  }

  /**
   *
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    const { postMessageData } = this.props;
    if (prevProps.postMessageData !== postMessageData) {
      // send a message if postMessageData changed
      this.sendMessage(postMessageData);
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    window.removeEventListener('message', this.onReceiveMessage, false);
  }

  /**
   *
   * @param event
   */
  onReceiveMessage(event) {
    const { handleReceiveMessage } = this.props;
    if (handleReceiveMessage) {
      handleReceiveMessage(event);
    }
  }

  /**
   *
   */
  onLoad() {
    const { handleReady } = this.props;
    if (handleReady) {
      handleReady();
    }
    // TODO: Look into doing a syn-ack TCP-like handshake
    //       to make sure iFrame is ready to REALLY accept messages, not just loaded.
    // send intial props when iframe loads
    const { postMessageData } = this.props;
    this.sendMessage(postMessageData);
  }

  /**
   *
   * @param data
   * @returns {string|*}
   */
  serializePostMessageData(data) {
    // Rely on the browser's built-in structured clone algorithm for serialization of the
    // message as described in
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    const { serializeMessage } = this.props;
    if (!serializeMessage) {
      return data;
    }

    // To be on the safe side we can also ignore the browser's built-in serialization feature
    // and serialize the data manually.
    if (typeof data === 'object') {
      return JSON.stringify(data);
    } if (typeof data === 'string') {
      return data;
    }
    return `${data}`;
  }

  /**
   *
   * @param postMessageData
   */
  sendMessage(postMessageData) {
    // Using postMessage data from props will result in a subtle but deadly bug,
    // where old data from props is being sent instead of new postMessageData.
    // This is because data sent from componentWillReceiveProps is not yet
    // in props but only in nextProps.
    const { targetOrigin } = this.props;
    const serializedData = this.serializePostMessageData(postMessageData);
    this.frame.contentWindow.postMessage(serializedData, targetOrigin);
  }

  /**
   *
   * @returns {*}
   */
  render() {
    const { attributes } = this.props;
    // define some sensible defaults for our iframe attributes
    const defaultAttributes = {
      allowFullScreen: false,
      frameBorder: 0,
    };
    // then merge in the user's attributes with our defaults
    const mergedAttributes = Object.assign(
      {},
      defaultAttributes,
      attributes,
    );
    return (
      <iframe //eslint-disable-line
        ref={(el) => {
          this.frame = el;
        }}
        {...mergedAttributes}
      />
    );
  }
}

IframeComm.defaultProps = {
  attributes: {},
  handleReady: {},
  handleReceiveMessage: {},
  serializeMessage: true,
  targetOrigin: '*',
};

IframeComm.propTypes = {
  /*
      Iframe Attributes
      https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#Attributes
      React Supported Attributes
      https://facebook.github.io/react/docs/dom-elements.html#all-supported-html-attributes
      Note: attributes are camelCase, not all lowercase as usually defined.
  */
  attributes: PropTypes.shape({
    allowFullScreen: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    frameBorder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    sandbox: PropTypes.string,
    scrolling: PropTypes.string,
    // https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
    src: PropTypes.string.isRequired,
    srcDoc: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  /*
      Callback function called when iframe loads. We're simply listening
      to the iframe's `window.onload`. To ensure communication code in your iframe
       is totally loaded, you can implement a syn-ack TCP-like handshake using
      `postMessageData` and `handleReceiveMessage`.
  */
  handleReady: PropTypes.func,
  // Callback function called when iFrame sends the parent window a message.
  handleReceiveMessage: PropTypes.func,

  /*
      You can pass it anything you want, we'll serialize to a string
      preferablly use a simple string message or an object.
      If you use an object, you need to follow the same naming convention
      in the iframe so you can parse it accordingly.
   */
  postMessageData: PropTypes.any.isRequired, //eslint-disable-line

  /*
      Enable use of the browser's built-in structured clone algorithm for serialization
      by settings this to `false`.
      Default is `true`, using our built in logic for serializing everything to a string.
  */
  serializeMessage: PropTypes.bool,

  /*
      Always provide a specific targetOrigin, not *, if you know where the other window's
       document should be located. Failing to provide a specific target discloses the data
        you send to any interested malicious site.
   */
  targetOrigin: PropTypes.string,
};
