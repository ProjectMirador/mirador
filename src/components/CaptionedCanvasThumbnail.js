import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import { CanvasThumbnail } from './CanvasThumbnail';
import ns from '../config/css-ns';

/** */
export class CaptionedCanvasThumbnail extends Component {
  /** */
  render() {
    const { canvas, classes, height } = this.props;
    const manifestoCanvas = new ManifestoCanvas(canvas);
    return (
      <div
        key={canvas.id}
        style={{
          display: 'inline-block',
          height: 'inherit',
          position: 'relative',
        }}
      >
        <CanvasThumbnail
          imageUrl={
            manifestoCanvas.thumbnail(null, 200)
          }
          isValid={manifestoCanvas.hasValidDimensions}
          maxHeight={height}
          style={{
            maxWidth: `${Math.ceil(height * manifestoCanvas.aspectRatio)}px`,
            verticalAlign: 'bottom',
          }}
        />
        <div
          className={classNames(ns('canvas-thumb-label'), classes.canvasThumbLabel)}
          style={{
            width: '100%',
          }}
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
              {manifestoCanvas.getLabel()}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

CaptionedCanvasThumbnail.propTypes = {
  canvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  height: PropTypes.number.isRequired,
};
