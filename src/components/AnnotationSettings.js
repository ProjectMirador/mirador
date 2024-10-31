import VisibilityIcon from '@mui/icons-material/VisibilitySharp';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
/* eslint-disable react/prop-types */

/**
 * AnnotationSettings is a component to handle various annotation
 * display settings in the Annotation companion window
 */
export default function AnnotationSettings({
  displayAll,
  displayAllDisabled,
  t,
  toggleAnnotationDisplay,
}) {
  return (
    <MiradorMenuButton
      aria-label={t(displayAll ? 'displayNoAnnotations' : 'highlightAllAnnotations')}
      onClick={toggleAnnotationDisplay}
      disabled={displayAllDisabled}
      size="small"
    >
      {displayAll ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </MiradorMenuButton>
  );
}
