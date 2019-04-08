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
   * render
   * @return
   */
  render() {
    const {
      showZoomControls, classes, t, zoomIn, zoomOut, zoomToWorld,
    } = this.props;

    if (!showZoomControls) {
      return (
        <>
        </>
      );
    }
    return (
      <div className={classes.zoom_controls}>
        <MiradorMenuButton aria-label={t('zoomIn')} onClick={zoomIn}>
          <AddCircleIcon />
        </MiradorMenuButton>
        <MiradorMenuButton aria-label={t('zoomOut')} onClick={zoomOut}>
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
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  showZoomControls: PropTypes.bool,
  t: PropTypes.func,
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired,
  zoomToWorld: PropTypes.func.isRequired,
};

ZoomControls.defaultProps = {
  showZoomControls: false,
  t: key => key,
};
