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

  /**
   * render
   * @return
   */
  render() {
    const {
      showZoomControls, classes, t, zoomToWorld,
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
        <MiradorMenuButton aria-label={t('zoomReset')} onClick={() => zoomToWorld(false)}>
          <RestoreZoomIcon />
        </MiradorMenuButton>
      </div>
    );
  }
}

ZoomControls.propTypes = {
  windowId: PropTypes.string,
  showZoomControls: PropTypes.bool,
  viewer: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    zoom: PropTypes.number,
  }),
  updateViewport: PropTypes.func,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
  zoomToWorld: PropTypes.func.isRequired,
};

ZoomControls.defaultProps = {
  windowId: '',
  showZoomControls: false,
  viewer: {},
  updateViewport: () => {},
  t: key => key,
};
