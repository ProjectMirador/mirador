import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import MiradorCanvas from '../lib/MiradorCanvas';
import { CanvasThumbnail } from './CanvasThumbnail';

/** */
export class SidebarIndexThumbnail extends Component {
  /** */
  render() {
    const {
      classes, config, otherCanvas, canvas,
    } = this.props;

    const { width, height } = config.canvasNavigation;
    const miradorCanvas = new MiradorCanvas(otherCanvas);

    return (
      <>
        <div style={{ minWidth: 50 }}>
          <CanvasThumbnail
            className={classNames(classes.clickable)}
            isValid={miradorCanvas.hasValidDimensions}
            imageUrl={miradorCanvas.thumbnail(width, height)}
            maxHeight={config.canvasNavigation.height}
            maxWidth={config.canvasNavigation.width}
            aspectRatio={miradorCanvas.aspectRatio}
          />
        </div>
        <Typography
          className={classNames(classes.label)}
          variant="body1"
        >
          {canvas.label}
        </Typography>
      </>
    );
  }
}

SidebarIndexThumbnail.propTypes = {
  canvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  otherCanvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
