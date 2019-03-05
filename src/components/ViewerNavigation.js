import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import NavigationIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import PropTypes from 'prop-types';
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
    const { window, setCanvas } = this.props;
    if (this.hasNextCanvas()) {
      setCanvas(window.id, window.canvasIndex + this.canvasIncrementor());
    }
  }

  /**
   */
  hasNextCanvas() {
    const { window, canvases } = this.props;
    return window.canvasIndex < canvases.length - this.canvasIncrementor();
  }

  /**
   */
  previousCanvas() {
    const { window, setCanvas } = this.props;
    if (this.hasPreviousCanvas()) {
      setCanvas(window.id, Math.max(0, window.canvasIndex - this.canvasIncrementor()));
    }
  }

  /**
   */
  hasPreviousCanvas() {
    const { window } = this.props;
    return window.canvasIndex > 0;
  }

  /**
   */
  canvasIncrementor() {
    const { window } = this.props;
    switch (window.view) {
      case 'book':
        return 2;
      default:
        return 1;
    }
  }

  /**
   * Renders things
   */
  render() {
    const { t } = this.props;

    return (
      <div className={ns('osd-navigation')}>
        <IconButton
          className={ns('previous-canvas-button')}
          disabled={!this.hasPreviousCanvas()}
          onClick={this.previousCanvas}
          aria-label={t('previousCanvas')}
        >
          <NavigationIcon style={{ transform: 'rotate(180deg)' }} />
        </IconButton>
        <IconButton
          className={ns('next-canvas-button')}
          disabled={!this.hasNextCanvas()}
          onClick={this.nextCanvas}
          aria-label={t('nextCanvas')}
        >
          <NavigationIcon />
        </IconButton>
      </div>
    );
  }
}

ViewerNavigation.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
};
