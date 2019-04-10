import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GalleryViewThumbnail from '../containers/GalleryViewThumbnail';

/**
 * Renders a GalleryView overview of the manifest.
 */
export class GalleryView extends Component {
  /**
   * Renders things
   */
  render() {
    const {
      canvases, classes, selectedCanvasIndex, windowId,
    } = this.props;
    return (
      <>
        <section
          className={classes.galleryContainer}
          id={`${windowId}-gallery`}
        >
          {
            canvases.map(canvas => (
              <GalleryViewThumbnail
                key={canvas.id}
                selected={selectedCanvasIndex === canvas.index}
                windowId={windowId}
                canvas={canvas}
              />
            ))
          }
        </section>
      </>
    );
  }
}

GalleryView.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  selectedCanvasIndex: PropTypes.number.isRequired,
  windowId: PropTypes.string.isRequired,
};

GalleryView.defaultProps = {
  classes: {},
};
