import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftSharp';
import ChevronRightIcon from '@mui/icons-material/ChevronRightSharp';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import {
  getSearchNumTotal,
  getSelectedContentSearchAnnotationIds,
  getSortedSearchHitsForCompanionWindow,
  getThemeDirection,
} from '../state/selectors';

/**
 * SearchPanelNavigation ~
 */
export function SearchPanelNavigation({ companionWindowId, windowId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const direction = useSelector(getThemeDirection);
  const numTotal = useSelector((state) => getSearchNumTotal(state, { companionWindowId, windowId }));
  const searchHits = useSelector((state) => getSortedSearchHitsForCompanionWindow(state, { companionWindowId, windowId }));
  const selectedContentSearchAnnotation = useSelector((state) =>
    getSelectedContentSearchAnnotationIds(state, {
      companionWindowId,
      windowId,
    }),
  );

  const selectAnnotation = useCallback((...args) => dispatch(actions.selectAnnotation(windowId, ...args)), [dispatch, windowId]);

  /** */
  const nextSearchResult = (currentHitIndex) => {
    selectAnnotation(searchHits[currentHitIndex + 1].annotations[0]);
  };

  /** */
  const previousSearchResult = (currentHitIndex) => {
    selectAnnotation(searchHits[currentHitIndex - 1].annotations[0]);
  };

  /** */
  const hasNextResult = (currentHitIndex) => {
    if (searchHits.length === 0) return false;
    if (currentHitIndex < searchHits.length - 1) return true;
    return false;
  };

  /** */
  const hasPreviousResult = (currentHitIndex) => {
    if (searchHits.length === 0) return false;
    if (currentHitIndex > 0) return true;
    return false;
  };

  const iconStyle = direction === 'rtl' ? { transform: 'rotate(180deg)' } : {};

  const currentHitIndex = searchHits.findIndex((val) => val.annotations.includes(selectedContentSearchAnnotation[0]));
  let lengthText = searchHits.length;
  if (searchHits.length < numTotal) {
    lengthText += '+';
  }

  if (searchHits.length === 0) return null;

  return (
    <Typography variant="body2" align="center">
      <MiradorMenuButton
        aria-label={t('searchPreviousResult')}
        disabled={!hasPreviousResult(currentHitIndex)}
        onClick={() => previousSearchResult(currentHitIndex)}
      >
        <ChevronLeftIcon style={iconStyle} />
      </MiradorMenuButton>
      <span style={{ unicodeBidi: 'plaintext' }} role="status">
        {t('pagination', { current: currentHitIndex + 1, total: lengthText })}
      </span>
      <MiradorMenuButton
        aria-label={t('searchNextResult')}
        disabled={!hasNextResult(currentHitIndex)}
        onClick={() => nextSearchResult(currentHitIndex)}
      >
        <ChevronRightIcon style={iconStyle} />
      </MiradorMenuButton>
    </Typography>
  );
}

SearchPanelNavigation.propTypes = {
  companionWindowId: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};

export default withPlugins('SearchPanelNavigation')(SearchPanelNavigation);
