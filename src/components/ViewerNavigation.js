import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';

/**
 */
class ViewerNavigation extends Component {
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
        <IconButton
          className={ns('previous-canvas-button')}
          disabled={!this.hasPreviousCanvas()}
          onClick={this.previousCanvas}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          className={ns('next-canvas-button')}
          disabled={!this.hasNextCanvas()}
          onClick={this.nextCanvas}
        >
          <ChevronRightIcon />
        </IconButton>
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

export default ViewerNavigation;
