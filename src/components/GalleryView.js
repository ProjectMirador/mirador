import { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
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
      canvases, viewingDirection, windowId,
    } = this.props;
    const htmlDir = viewingDirection === 'right-to-left' ? 'rtl' : 'ltr';
    return (
      <Paper
        component="section"
        aria-label="gallery section"
        dir={htmlDir}
        square
        elevation={0}
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          overflowX: 'hidden',
          overflowY: 'scroll',
          padding: '50px 0 50px 20px',
          width: '100%',
        }}
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
  viewingDirection: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

GalleryView.defaultProps = {
  viewingDirection: '',
};
