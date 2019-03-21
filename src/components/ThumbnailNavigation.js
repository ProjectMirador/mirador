import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { CanvasThumbnail } from './CanvasThumbnail';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import ns from '../config/css-ns';

/**
 */
export class ThumbnailNavigation extends Component {
  /**
   */
  constructor(props) {
    super(props);

    this.scrollbarSize = 15;
    this.spacing = 16; // 2 * (2px margin + 2px border + 2px padding + 2px padding)
  }

  /** */
  containerHeight() {
    const { config, position } = this.props;
    switch (position) {
      case 'far-right':
        return '100%';
      default:
        return config.thumbnailNavigation.height;
    }
  }

  /** */
  containerWidth() {
    const { config, position } = this.props;
    switch (position) {
      case 'far-right':
        return config.thumbnailNavigation.width;
      default:
        return '100%';
    }
  }

  /** */
  containerOverflow() {
    const { position } = this.props;
    switch (position) {
      case 'far-right':
        return '200px';
      default:
        return 'auto';
    }
  }

  /** */
  containerDisplay() {
    const { position } = this.props;
    switch (position) {
      case 'far-right':
        return 'flex';
      default:
        return 'flex';
    }
  }

  /** */
  flexWrap() {
    const { position } = this.props;
    switch (position) {
      case 'far-right':
        return 'wrap';
      default:
        return 'nowrap';
    }
  }

  /** */
  flexDirection() {
    const { position } = this.props;
    switch (position) {
      case 'far-right':
        return 'row';
      default:
        return 'row';
    }
  }

  /**
   * Determines whether the current index is the rendered canvas, providing
   * a useful class.
   */
  currentCanvasClass(canvasIndices) {
    const { window } = this.props;
    if (canvasIndices.includes(window.canvasIndex)) return 'current-canvas';
    return '';
  }

  /**
   * Renders things
   */
  render() {
    const {
      position, canvasGroupings, setCanvas, config, classes, window, t,
    } = this.props;
    if (position === 'off') {
      return <></>;
    }
    return (
      <nav
        className={ns('thumb-navigation')}
        aria-label={t('thumbnailNavigation')}
        style={{
          alignItems: 'normal',
          display: this.containerDisplay(),
          flexDirection: this.flexDirection(),
          flexWrap: this.flexWrap(),
          height: this.containerHeight(),
          overflowX: (position === 'far-right') ? 'hidden' : 'scroll',
          overflowY: (position === 'far-right') ? 'scroll' : 'hidden',
          width: this.containerWidth(),
        }}
      >
        {
          canvasGroupings.groupings().map((grouping) => {
            const maxHeight = config.thumbnailNavigation.height
              - this.spacing - this.scrollbarSize;
            const fullWidth = grouping
              .map(canvas => new ManifestoCanvas(canvas).aspectRatio)
              .map(ar => ar * maxHeight)
              .reduce((acc, val) => acc + val);
            return (
              <div
                key={grouping.map(canvas => canvas.id).join('-')}
                role="button"
                onKeyUp={() => setCanvas(window.id, grouping[0].index)}
                onClick={() => setCanvas(window.id, grouping[0].index)}
                tabIndex={0}
                className={classNames(
                  ns(['thumbnail-nav-canvas', `thumbnail-nav-canvas-${grouping[0].index}`, this.currentCanvasClass(grouping.map(canvas => canvas.index))]),
                  classes.canvas,
                  {
                    [classes.currentCanvas]: grouping
                      .map(canvas => canvas.index).includes(window.canvasIndex),
                  },
                )}
                style={{
                  flexBasis: `${fullWidth}px`, // Needed for bottom area with a small number of images
                  height: config.thumbnailNavigation.height - this.spacing - this.scrollbarSize,
                }}
              >
                {grouping.map((canvas) => {
                  const manifestoCanvas = new ManifestoCanvas(canvas);
                  return (
                    <div
                      key={canvas.index}
                      style={{
                        flex: '1',
                        position: 'relative',
                      }}
                    >
                      <CanvasThumbnail
                        imageUrl={
                          manifestoCanvas.thumbnail(null, config.thumbnailNavigation.height)
                        }
                        isValid={manifestoCanvas.hasValidDimensions}
                        maxHeight={maxHeight}
                        aspectRatio={manifestoCanvas.aspectRatio}
                      />
                      <div
                        className={ns('canvas-thumb-label')}
                        style={{
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                          bottom: '0px',
                          position: 'absolute',
                          width: `${maxHeight * manifestoCanvas.aspectRatio}px`,
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
          })
        }
      </nav>
    );
  }
}

ThumbnailNavigation.propTypes = {
  canvasGroupings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  position: PropTypes.string.isRequired,
  setCanvas: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
