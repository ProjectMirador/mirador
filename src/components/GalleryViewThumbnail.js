import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import AnnotationIcon from '@material-ui/icons/CommentSharp';
import SearchIcon from '@material-ui/icons/SearchSharp';
import classNames from 'classnames';
import 'intersection-observer'; // polyfill needed for Safari
import IntersectionObserver from '@researchgate/react-intersection-observer';
import MiradorCanvas from '../lib/MiradorCanvas';
import IIIFThumbnail from '../containers/IIIFThumbnail';

/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export class GalleryViewThumbnail extends Component {
  /** */
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  /** @private */
  handleSelect() {
    const {
      canvas, selected, setCanvas, focusOnCanvas,
    } = this.props;

    if (selected) {
      focusOnCanvas();
    } else {
      setCanvas(canvas.id);
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
      setCanvas(canvas.index, canvas.id);
    }
  }

  /** */
  handleIntersection({ isIntersecting }) {
    const {
      annotations,
      canvas,
      requestAnnotation, receiveAnnotation,
    } = this.props;
    if (!isIntersecting) return;

    const { annotationListUris = [], canvasAnnotationPages = [] } = new MiradorCanvas(canvas);

    annotationListUris
      .filter(uri => !(annotations[uri]))
      .forEach(uri => requestAnnotation(uri));
    // IIIF v3
    canvasAnnotationPages
      .filter(annotation => !(annotations[annotation.id]))
      .forEach((annotation) => {
        // If there are no items, try to retrieve the referenced resource.
        // otherwise the resource should be embedded and just add to the store.
        if (!annotation.items) {
          requestAnnotation(annotation.id);
        } else {
          receiveAnnotation(annotation);
        }
      });
  }

  /**
   * Renders things
   */
  render() {
    const {
      annotationsCount, searchAnnotationsCount,
      canvas, classes, config, selected,
    } = this.props;

    const miradorCanvas = new MiradorCanvas(canvas);

    return (
      <IntersectionObserver onChange={this.handleIntersection}>
        <div
          key={canvas.index}
          className={
            classNames(
              classes.galleryViewItem,
              selected ? classes.selected : '',
              searchAnnotationsCount > 0 ? classes.hasAnnotations : '',
            )
          }
          onClick={this.handleSelect}
          onKeyUp={this.handleKey}
          role="button"
          tabIndex={0}
        >
          <IIIFThumbnail
            resource={canvas}
            labelled
            variant="outside"
            maxWidth={config.width}
            maxHeight={config.height}
            style={{
              margin: '0 auto',
              maxWidth: `${Math.ceil(config.height * miradorCanvas.aspectRatio)}px`,
            }}
          >
            <div className={classes.chips}>
              { searchAnnotationsCount > 0 && (
                <Chip
                  avatar={(
                    <Avatar className={classes.avatar} classes={{ circle: classes.avatarIcon }}>
                      <SearchIcon fontSize="small" />
                    </Avatar>
                  )}
                  label={searchAnnotationsCount}
                  className={classNames(classes.searchChip)}
                  size="small"
                />
              )}
              { annotationsCount > 0 && (
                <Chip
                  avatar={(
                    <Avatar className={classes.avatar} classes={{ circle: classes.avatarIcon }}>
                      <AnnotationIcon className={classes.annotationIcon} />
                    </Avatar>
                  )}
                  label={annotationsCount}
                  className={
                    classNames(
                      classes.annotationsChip,
                    )
                  }
                  size="small"
                />
              )}
            </div>
          </IIIFThumbnail>
        </div>
      </IntersectionObserver>
    );
  }
}

GalleryViewThumbnail.propTypes = {
  annotations: PropTypes.objectOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  annotationsCount: PropTypes.number,
  canvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  config: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  focusOnCanvas: PropTypes.func.isRequired,
  receiveAnnotation: PropTypes.func,
  requestAnnotation: PropTypes.func,
  searchAnnotationsCount: PropTypes.number,
  selected: PropTypes.bool,
  setCanvas: PropTypes.func.isRequired,
};

GalleryViewThumbnail.defaultProps = {
  annotations: {},
  annotationsCount: 0,
  config: {
    height: 100,
    width: null,
  },
  receiveAnnotation: () => {},
  requestAnnotation: () => {},
  searchAnnotationsCount: 0,
  selected: false,
};
