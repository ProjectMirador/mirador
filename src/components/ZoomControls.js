import React, { Component } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircleOutlineSharp';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import PropTypes from 'prop-types';
import RestoreZoomIcon from './icons/RestoreZoomIcon';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 */
export class ZoomControls extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);

    this.handleZoomInClick = this.handleZoomInClick.bind(this);
    this.handleZoomOutClick = this.handleZoomOutClick.bind(this);
    this.zoomToWorld = this.zoomToWorld.bind(this);
  }

  /**
   * @private
   */
  handleZoomInClick() {
    const { windowId, updateViewport, viewer } = this.props;

    updateViewport(windowId, {
      x: viewer.x,
      y: viewer.y,
      zoom: viewer.zoom * 2,
    });
  }

  /**
   * @private
   */
  handleZoomOutClick() {
    const { windowId, updateViewport, viewer } = this.props;

    updateViewport(windowId, {
      x: viewer.x,
      y: viewer.y,
      zoom: viewer.zoom / 2,
    });
  }

  /** */
  zoomToWorld() {
    const { zoomToWorld } = this.props;
    zoomToWorld(false);
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      showZoomControls, classes, t,
    } = this.props;

    if (!showZoomControls) {
      return (
        <>
        </>
      );
    }
    return (
      <div className={classes.zoom_controls}>
        <MiradorMenuButton aria-label={t('zoomIn')} onClick={this.handleZoomInClick}>
          <AddCircleIcon />
        </MiradorMenuButton>
        <MiradorMenuButton aria-label={t('zoomOut')} onClick={this.handleZoomOutClick}>
          <RemoveCircleIcon />
        </MiradorMenuButton>
        <MiradorMenuButton aria-label={t('zoomReset')} onClick={this.zoomToWorld}>
          <RestoreZoomIcon />
        </MiradorMenuButton>
      </div>
    );
  }
}

ZoomControls.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  showZoomControls: PropTypes.bool,
  t: PropTypes.func,
  updateViewport: PropTypes.func,
  viewer: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    zoom: PropTypes.number,
  }),
  windowId: PropTypes.string,
  zoomToWorld: PropTypes.func.isRequired,
};

ZoomControls.defaultProps = {
  showZoomControls: false,
  t: key => key,
  updateViewport: () => {},
  viewer: {},
  windowId: '',
};
