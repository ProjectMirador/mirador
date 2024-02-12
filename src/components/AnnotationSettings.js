import { Component } from 'react';
import PropTypes from 'prop-types';
import VisibilityIcon from '@mui/icons-material/VisibilitySharp';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffSharp';
import SyncIcon from '@mui/icons-material/Sync';
import SyncDisabledIcon from '@mui/icons-material/SyncDisabled';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import { VideosReferences } from '../plugins/VideosReferences';

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
      windowId, autoScroll, autoScrollDisabled,
      displayAll, displayAllDisabled, t, toggleAnnotationAutoScroll, toggleAnnotationDisplay,
    } = this.props;

    const mediaIsVideo = typeof VideosReferences.get(windowId) !== 'undefined';

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
        { mediaIsVideo && (
        <MiradorMenuButton
          aria-label={autoScroll ? 'Disable auto scroll' : 'Enable auto scroll'}
          onClick={toggleAnnotationAutoScroll}
          disabled={autoScrollDisabled}
          size="small"
        >
          { autoScroll ? <SyncIcon /> : <SyncDisabledIcon /> }
        </MiradorMenuButton>
        )}
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
