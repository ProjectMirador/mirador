import { Component } from 'react';
import PropTypes from 'prop-types';
import VisibilityIcon from '@material-ui/icons/VisibilitySharp';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffSharp';
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
      displayAll, displayAllDisabled, t, toggleAnnotationDisplay,
    } = this.props;

    return (
      <MiradorMenuButton
        aria-label={t(displayAll ? 'displayNoAnnotations' : 'highlightAllAnnotations')}
        onClick={toggleAnnotationDisplay}
        disabled={displayAllDisabled}
        size="small"
      >
        { displayAll ? <VisibilityIcon /> : <VisibilityOffIcon /> }
      </MiradorMenuButton>
    );
  }
}

AnnotationSettings.propTypes = {
  displayAll: PropTypes.bool.isRequired,
  displayAllDisabled: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  toggleAnnotationDisplay: PropTypes.func.isRequired,
};
