import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import MiradorCanvas from '../lib/MiradorCanvas';
import { CanvasThumbnail } from './CanvasThumbnail';
import ns from '../config/css-ns';

/** */
export class CaptionedCanvasThumbnail extends Component {
  /** */
  render() {
    const { canvas, classes, height } = this.props;
    const miradorCanvas = new MiradorCanvas(canvas);
    return (
      <div
        key={canvas.id}
        className={classes.container}
      >
        <CanvasThumbnail
          imageUrl={
            miradorCanvas.thumbnail(null, 200)
            // TODO: When we make these areas resizable, we should probably not hard code this
          }
          isValid={miradorCanvas.hasValidDimensions}
          maxHeight={height}
          style={{
            maxWidth: `${Math.ceil(height * miradorCanvas.aspectRatio)}px`,
          }}
        />
        <div
          className={classNames(ns('canvas-thumb-label'), classes.canvasThumbLabel)}
        >
          <div
            style={{
              margin: '4px',
            }}
          >
            <Typography
              classes={{ root: classes.title }}
              variant="caption"
            >
              {miradorCanvas.getLabel()}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

CaptionedCanvasThumbnail.propTypes = {
  canvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  height: PropTypes.number.isRequired,
};
