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
export class GalleryViewThumbnail extends Component {
  /** */
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  /** @private */
  handleSelect() {
    const {
      canvas, selected, setCanvas, focusOnCanvas,
    } = this.props;

    if (selected) {
      focusOnCanvas();
    } else {
      setCanvas(canvas.index);
    }
  }

  /** @private */
  handleKey(event) {
    const {
      canvas, setCanvas, focusOnCanvas,
    } = this.props;

    this.keys = {
      enter: 'Enter',
      space: ' ',
    };

    this.chars = {
      enter: 13,
      space: 32,
    };

    const enterOrSpace = (
      event.key === this.keys.enter
      || event.which === this.chars.enter
      || event.key === this.keys.space
      || event.which === this.chars.space
    );

    if (enterOrSpace) {
      focusOnCanvas();
    } else {
      setCanvas(canvas.index);
    }
  }

  /**
   * Renders things
   */
  render() {
    const {
      canvas, classes, selected,
    } = this.props;

    const manifestoCanvas = new ManifestoCanvas(canvas);

    return (
      <div
        key={canvas.index}
        className={
          classNames(
            classes.galleryViewItem,
            selected ? classes.galleryViewItemCurrent : '',
          )
        }
        onClick={this.handleSelect}
        onKeyUp={this.handleSelect}
        role="button"
        tabIndex={0}
      >
        <CanvasThumbnail
          imageUrl={manifestoCanvas.thumbnail(null, 100)}
          isValid={manifestoCanvas.hasValidDimensions}
          maxHeight={120}
          aspectRatio={manifestoCanvas.aspectRatio}
          style={{ margin: '0 auto' }}
        />
        <Typography variant="caption" className={classes.galleryViewCaption}>
          {manifestoCanvas.getLabel()}
        </Typography>
      </div>
    );
  }
}

GalleryViewThumbnail.propTypes = {
  canvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  focusOnCanvas: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  setCanvas: PropTypes.func.isRequired,
};

GalleryViewThumbnail.defaultProps = {
  selected: false,
};
