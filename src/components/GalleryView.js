import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
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
      canvases, classes, viewingDirection, windowId,
    } = this.props;
    const htmlDir = viewingDirection === 'right-to-left' ? 'rtl' : 'ltr';
    return (
      <Paper
        component="section"
        dir={htmlDir}
        square
        elevation={0}
        className={classes.galleryContainer}
        id={`${windowId}-gallery`}
      >
        {
          canvases.map(canvas => (
            <GalleryViewThumbnail
              key={canvas.id}
              windowId={windowId}
              canvas={canvas}
            />
          ))
        }
      </Paper>
    );
  }
}

GalleryView.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.objectOf(PropTypes.string),
  viewingDirection: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

GalleryView.defaultProps = {
  classes: {},
  viewingDirection: '',
};
