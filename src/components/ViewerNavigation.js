import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { actions } from '../store';
import ns from '../config/css-ns';

/**
 */
export class ViewerNavigation extends Component {
  /**
   */
  constructor(props) {
    super(props);

    this.nextCanvas = this.nextCanvas.bind(this);
    this.previousCanvas = this.previousCanvas.bind(this);
  }

  /**
   */
  nextCanvas() {
    const { window, nextCanvas } = this.props;
    if (this.hasNextCanvas()) nextCanvas(window.id);
  }

  /**
   */
  hasNextCanvas() {
    const { window, canvases } = this.props;
    return window.canvasIndex < canvases.length - 1;
  }

  /**
   */
  previousCanvas() {
    const { window, previousCanvas } = this.props;
    if (this.hasPreviousCanvas()) previousCanvas(window.id);
  }

  /**
   */
  hasPreviousCanvas() {
    const { window } = this.props;
    return window.canvasIndex > 0;
  }

  /**
   * Renders things
   */
  render() {
    return (
      <div className={ns('osd-navigation')}>
        <button
          className={ns('previous-canvas-button')}
          type="button"
          disabled={!this.hasPreviousCanvas()}
          onClick={this.previousCanvas}
        >
        &#8249;
        </button>
        <button
          className={ns('next-canvas-button')}
          type="button"
          disabled={!this.hasNextCanvas()}
          onClick={this.nextCanvas}
        >
        &#8250;
        </button>
      </div>
    );
  }
}

ViewerNavigation.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  nextCanvas: PropTypes.func.isRequired,
  previousCanvas: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};


/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = {
  nextCanvas: actions.nextCanvas,
  previousCanvas: actions.previousCanvas,
};

const enhance = compose(
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(ViewerNavigation);
