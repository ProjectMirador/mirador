import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import { CanvasThumbnail } from './CanvasThumbnail';
import ns from '../config/css-ns';

/** */
export class ThumbnailCanvasGrouping extends Component {
  /**
   * Determines whether the current index is the rendered canvas, providing
   * a useful class.
   */
  currentCanvasClass(canvasIndices) {
    const { window } = this.props;
    if (canvasIndices.includes(window.canvasIndex)) return 'current-canvas';
    return '';
  }

  /** */
  render() {
    const {
      classes, config, grouping, height, position, setCanvas, window,
    } = this.props;
    const fullWidth = grouping
      .map(canvas => new ManifestoCanvas(canvas).aspectRatio)
      .map(ar => ar * height)
      .reduce((acc, val) => acc + val);
    return (
      <div
        role="button"
        onKeyUp={() => setCanvas(window.id, grouping[0].index)}
        onClick={() => setCanvas(window.id, grouping[0].index)}
        tabIndex={0}
        style={{
          display: 'inline-block',
          height: (position === 'far-right') ? 'auto' : `${height}px`,
          maxWidth: (position === 'far-right') ? config.thumbnailNavigation.width - 15 - 16 : null,
          whiteSpace: 'nowrap',
          width: `${fullWidth}px`,
        }}
        className={classNames(
          ns(['thumbnail-nav-canvas', `thumbnail-nav-canvas-${grouping[0].index}`, this.currentCanvasClass(grouping.map(canvas => canvas.index))]),
          classes.canvas,
          {
            [classes.currentCanvas]: grouping
              .map(canvas => canvas.index).includes(window.canvasIndex),
          },
        )}
      >
        {grouping.map((canvas) => {
          const manifestoCanvas = new ManifestoCanvas(canvas);
          return (
            <div
              key={canvas.id}
              style={{
                display: 'inline',
                position: 'relative',
              }}
            >
              <CanvasThumbnail
                imageUrl={
                  manifestoCanvas.thumbnail(null, config.thumbnailNavigation.height)
                }
                isValid={manifestoCanvas.hasValidDimensions}
                maxHeight={height}
                style={{
                  maxWidth: `${height * manifestoCanvas.aspectRatio}px`,
                }}
              />
              <div
                className={classNames(ns('canvas-thumb-label'), classes.canvasThumbLabel)}
                style={{
                  width: `${height * manifestoCanvas.aspectRatio}px`,
                }}
              >
                <div
                  style={{
                    margin: '4px',
                    padding: '4px',
                  }}
                >
                  <Typography
                    classes={{ root: classes.title }}
                    variant="caption"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '100%',
                    }}
                  >
                    {manifestoCanvas.getLabel()}
                  </Typography>
                </div>
              </div>
            </div>
          );
        })
        }
      </div>
    );
  }
}

ThumbnailCanvasGrouping.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  grouping: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  height: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  setCanvas: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
