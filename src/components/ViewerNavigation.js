import React, { Component } from 'react';
import NavigationIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import PropTypes from 'prop-types';
import MiradorMenuButton from '../containers/MiradorMenuButton';
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
    const { canvasIndex, setCanvasByIndex } = this.props;
    if (this.hasNextCanvas()) {
      setCanvasByIndex(canvasIndex + this.canvasIncrementor());
    }
  }

  /**
   */
  hasNextCanvas() {
    const { canvasIndex, canvases } = this.props;
    return canvasIndex < canvases.length - this.canvasIncrementor();
  }

  /**
   */
  previousCanvas() {
    const { canvasIndex, setCanvasByIndex } = this.props;
    if (this.hasPreviousCanvas()) {
      setCanvasByIndex(Math.max(0, canvasIndex - this.canvasIncrementor()));
    }
  }

  /**
   */
  hasPreviousCanvas() {
    const { canvasIndex } = this.props;
    return canvasIndex > 0;
  }

  /**
   */
  canvasIncrementor() {
    const { canvasIndex, canvases, view } = this.props;
    switch (view) {
      case 'book':
        // the case where the index is n - 1
        if (canvasIndex === canvases.length - 2) return 1;
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
        <MiradorMenuButton
          aria-label={t('previousCanvas')}
          className={ns('previous-canvas-button')}
          disabled={!this.hasPreviousCanvas()}
          onClick={this.previousCanvas}
        >
          <NavigationIcon style={{ transform: 'rotate(180deg)' }} />
        </MiradorMenuButton>
        <MiradorMenuButton
          aria-label={t('nextCanvas')}
          className={ns('next-canvas-button')}
          disabled={!this.hasNextCanvas()}
          onClick={this.nextCanvas}
        >
          <NavigationIcon />
        </MiradorMenuButton>
      </div>
    );
  }
}

ViewerNavigation.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  canvasIndex: PropTypes.number.isRequired,
  setCanvasByIndex: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  view: PropTypes.string,
};

ViewerNavigation.defaultProps = {
  view: undefined,
};
