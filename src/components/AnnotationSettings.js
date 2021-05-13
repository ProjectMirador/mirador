import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisibilityIcon from '@material-ui/icons/VisibilitySharp';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffSharp';
import ImageIcon from '@material-ui/icons/Image';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 * AnnotationSettings is a component to handle various annotation
 * display settings in the Annotation companion window
*/
export class AnnotationSettings extends Component {
  /**
   * Returns the rendered component
  */
  render() {
    const {
      annotations, displayAll, displayAllDisabled, toggleAnnotationImage,
      selectedAnnotationId, t, toggleAnnotationDisplay, windowId,
    } = this.props;

    let annotation;
    for (let i = 0; i < annotations.length; i += 1) {
      annotation = annotations[i].resources.find(anno => anno.id === selectedAnnotationId);
      if (annotation) {
        break;
      }
    }

    return (
      <>
        <MiradorMenuButton
          aria-label={t(displayAll ? 'displayNoAnnotations' : 'highlightAllAnnotations')}
          onClick={toggleAnnotationDisplay}
          disabled={displayAllDisabled}
          size="small"
        >
          { displayAll ? <VisibilityIcon /> : <VisibilityOffIcon /> }
        </MiradorMenuButton>
        { annotation && annotation.body && (annotation.body[0].type === 'ImageBody' || annotation.body[0].type.includes('image')) && (
          <MiradorMenuButton
            aria-label={t('displayAnnotationImage')}
            onClick={() => { toggleAnnotationImage(windowId, annotation.id); }}
            size="small"
          >
            <ImageIcon />
          </MiradorMenuButton>
        )}
      </>
    );
  }
}

AnnotationSettings.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object),
  displayAll: PropTypes.bool.isRequired,
  displayAllDisabled: PropTypes.bool.isRequired,
  selectedAnnotationId: PropTypes.string,
  t: PropTypes.func.isRequired,
  toggleAnnotationDisplay: PropTypes.func.isRequired,
  toggleAnnotationImage: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

AnnotationSettings.defaultProps = {
  annotations: [],
  selectedAnnotationId: undefined,
};
