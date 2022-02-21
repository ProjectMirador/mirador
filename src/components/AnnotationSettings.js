import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SyncIcon from '@material-ui/icons/Sync';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';
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
      autoScroll, autoScrollDisabled,
      displayAll, displayAllDisabled, t, toggleAnnotationAutoScroll, toggleAnnotationDisplay,
    } = this.props;

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
        <MiradorMenuButton
          aria-label={autoScroll ? 'Disable auto scroll' : 'Enable auto scroll'}
          onClick={toggleAnnotationAutoScroll}
          disabled={autoScrollDisabled}
          size="small"
        >
          { autoScroll ? <SyncIcon /> : <SyncDisabledIcon /> }
        </MiradorMenuButton>
      </>
    );
  }
}

AnnotationSettings.defaultProps = {
  autoScroll: true,
  autoScrollDisabled: true,
  toggleAnnotationAutoScroll: () => {},
};
AnnotationSettings.propTypes = {
  autoScroll: PropTypes.bool,
  autoScrollDisabled: PropTypes.bool,
  displayAll: PropTypes.bool.isRequired,
  displayAllDisabled: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  toggleAnnotationAutoScroll: PropTypes.func,
  toggleAnnotationDisplay: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};
