import { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * Opens a new window for click
 */
export class NewWindow extends Component {
  /** */
  constructor(props) {
    super(props);

    this.released = undefined;
    this.window = null;
    this.checkIfWindowClosed = null;
  }

  /** */
  componentDidMount() {
    this.openWindow();
  }

  /**
   * Close the opened window we unmount
   */
  componentWillUnmount() {
    if (this.window) {
      this.window.close();
    }
  }

  /** @private */
  onClose() {
    const { onClose, url } = this.props;

    if (this.released) return;

    this.released = true;

    clearInterval(this.checkIfWindowClosed);

    onClose(url);
  }

  /** */
  openWindow() {
    const {
      depWindow, features, name, url,
    } = this.props;

    this.window = (depWindow || window).open(url, name, features);
    this.released = false;

    this.checkIfWindowClosed = setInterval(() => {
      if (!this.window || this.window.closed) {
        this.onClose();
      }
    }, 250);
  }

  /** */
  render() {
    return null;
  }
}

NewWindow.propTypes = {
  depWindow: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  features: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

NewWindow.defaultProps = {
  depWindow: undefined,
  features: undefined,
  name: undefined,
};
