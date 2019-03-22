import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import { CanvasThumbnail } from './CanvasThumbnail';

/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export class GalleryView extends Component {
  /**
   * Renders things
   */
  render() {
    const {
      canvases, classes, setCanvas, window,
    } = this.props;
    return (
      <>
        <section
          className={classes.galleryContainer}
          id={`${window.id}-gallery`}
        >
          {
            canvases.map((canvas) => {
              const manifestoCanvas = new ManifestoCanvas(canvas);
              return (
                <div
                  key={canvas.index}
                  className={
                    classNames(
                      classes.galleryViewItem,
                      canvas.index === window.canvasIndex ? classes.currentCanvas : '',
                    )
                  }
                  onClick={() => setCanvas(window.id, canvas.index)}
                  onKeyUp={() => setCanvas(window.id, canvas.index)}
                  role="button"
                  tabIndex={0}
                >
                  <CanvasThumbnail
                    imageUrl={manifestoCanvas.thumbnail(null, 100)}
                    isValid={manifestoCanvas.hasValidDimensions}
                    maxHeight={120}
                    maxWidth={100}
                    aspectRatio={manifestoCanvas.aspectRatio}
                    style={{ margin: '0 auto' }}
                  />
                  <Typography variant="caption">
                    {manifestoCanvas.getLabel()}
                  </Typography>
                </div>
              );
            })
          }
        </section>
      </>
    );
  }
}

GalleryView.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
