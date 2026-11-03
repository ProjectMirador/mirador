import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import BackIcon from '@mui/icons-material/ArrowBackSharp';
import { announce } from '@react-aria/live-announcer';
import { useTranslation } from 'react-i18next';
import SearchHit from '../containers/SearchHit';
import useSearchResults from '../hooks/useSearchResults';
import { ScrollTo } from './ScrollTo';

/** */
export function SearchResults({ companionWindowId, containerRef = undefined, windowId }) {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);
  const { currentIndex, fetchNextPage, hasNextPage, isFetching, query, results, total } = useSearchResults(
    windowId,
    companionWindowId,
  );

  /** */
  const toggleFocus = useCallback(() => {
    setFocused(!focused);
  }, [setFocused, focused]);

  if (results.length === 0) {
    if (!query || isFetching) return null;

    return (
      <Typography
        sx={{
          padding: 2,
          typography: 'h6',
        }}
      >
        {t('searchNoResults')}
      </Typography>
    );
  }

  return (
    <>
      {focused && (
        <ScrollTo containerRef={containerRef} offsetTop={96} scrollTo>
          <Button onClick={toggleFocus} sx={{ textTransform: 'none' }} size="small">
            <BackIcon />
            {t('backToResults')}
          </Button>
        </ScrollTo>
      )}
      <List disablePadding>
        {results.map((entry, index) => (
          <SearchHit
            announcer={announce}
            annotation={entry.annotation}
            annotationId={entry.annotationId}
            canvasId={entry.canvasId}
            companionWindowId={companionWindowId}
            containerRef={containerRef}
            // one annotation can appear in several hits, so the id alone isn't unique
            key={`${entry.annotationId}-${index}`}
            focused={focused}
            hit={entry.hit}
            index={index}
            selected={index === currentIndex}
            total={results.length}
            windowId={windowId}
            showDetails={toggleFocus}
          />
        ))}
      </List>
      {hasNextPage && (
        <Button sx={{ width: '100%' }} color="secondary" onClick={() => fetchNextPage()}>
          {t('moreResults')}
          <br />
          {`(${t('searchResultsRemaining', { numLeft: total - results.length })})`}
        </Button>
      )}
    </>
  );
}

SearchResults.propTypes = {
  companionWindowId: PropTypes.string.isRequired,
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  windowId: PropTypes.string.isRequired,
};
