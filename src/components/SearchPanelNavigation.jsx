import PropTypes from 'prop-types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftSharp';
import ChevronRightIcon from '@mui/icons-material/ChevronRightSharp';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import useSearchResults from '../hooks/useSearchResults';

/**
 * SearchPanelNavigation ~
 */
export function SearchPanelNavigation({ companionWindowId, direction, selectAnnotation, setCanvas, windowId }) {
  const { t } = useTranslation();
  const { currentIndex, results, total, visibleCanvasIds } = useSearchResults(windowId, companionWindowId);

  if (results.length === 0) return null;

  /** select a result and move to its canvas if it isn't already visible */
  const selectResult = (entry) => {
    if (!entry?.annotationId) return;

    selectAnnotation(entry.annotationId);
    if (entry.canvasId && !visibleCanvasIds.includes(entry.canvasId)) setCanvas(entry.canvasId);
  };

  const hasPreviousResult = currentIndex > 0;
  const hasNextResult = currentIndex < results.length - 1;
  const iconStyle = direction === 'rtl' ? { transform: 'rotate(180deg)' } : {};

  let lengthText = results.length;
  if (results.length < total) {
    lengthText += '+';
  }

  return (
    <Typography variant="body2" align="center">
      <MiradorMenuButton
        aria-label={t('searchPreviousResult')}
        disabled={!hasPreviousResult}
        onClick={() => selectResult(results[currentIndex - 1])}
      >
        <ChevronLeftIcon style={iconStyle} />
      </MiradorMenuButton>
      <span style={{ unicodeBidi: 'plaintext' }} role="status">
        {t('pagination', { current: currentIndex + 1, total: lengthText })}
      </span>
      <MiradorMenuButton
        aria-label={t('searchNextResult')}
        disabled={!hasNextResult}
        onClick={() => selectResult(results[currentIndex + 1])}
      >
        <ChevronRightIcon style={iconStyle} />
      </MiradorMenuButton>
    </Typography>
  );
}

SearchPanelNavigation.propTypes = {
  companionWindowId: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  selectAnnotation: PropTypes.func.isRequired,
  setCanvas: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};
