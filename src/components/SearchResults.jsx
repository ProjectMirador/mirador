import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import BackIcon from '@mui/icons-material/ArrowBackSharp';
import { announce } from '@react-aria/live-announcer';
import { useTranslation } from 'react-i18next';
import SearchHit from '../containers/SearchHit';
import AnnotationList from '../lib/AnnotationList';
import { ScrollTo } from './ScrollTo';

/**
 * Return SearchHits for every hit in the response
 * Return SearchHits for every annotation in the response if there are no hits
 */
function SearchHitsAndAnnotations({
  companionWindowId,
  containerRef,
  searchAnnotations,
  searchHits,
  windowId,
  focused,
  toggleFocus,
}) {
  if (searchHits.length === 0 && searchAnnotations.length > 0) {
    return searchAnnotations.map((anno, index) => (
      <SearchHit
        announcer={announce}
        annotationId={anno.id}
        companionWindowId={companionWindowId}
        containerRef={containerRef}
        key={anno.id}
        focused={focused}
        index={index}
        total={searchAnnotations.length}
        windowId={windowId}
        showDetails={toggleFocus}
      />
    ));
  }

  return searchHits.map((hit, index) => (
    <SearchHit
      announcer={announce}
      containerRef={containerRef}
      companionWindowId={companionWindowId}
      key={hit.annotations[0]}
      focused={focused}
      hit={hit}
      index={index}
      total={searchHits.length}
      windowId={windowId}
      showDetails={toggleFocus}
    />
  ));
}

/** */
export function SearchResults({
  canvases = [],
  companionWindowId,
  containerRef = undefined,
  data = {},
  isFetching = false,
  hasNextPage,
  fetchNextPage,
  query = undefined,
  windowId,
}) {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);

  /** */
  const toggleFocus = useCallback(() => {
    setFocused(!focused);
  }, [setFocused, focused]);

  if (!data?.pages?.length) {
    if (!query || isFetching) return;

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

  const searchAnnotations = (data?.pages?.flatMap(page => page.resources) ?? []).map(r => new AnnotationList(r));
  const canvasIds = (canvases || []).map(canvas => canvas.id);
  const searchHits = (data?.pages?.flatMap(page => page.hits) ?? []).sort((a, b) => {
    const hitA = searchAnnotations.find((r) => r.id === a.annotations[0]);
    const hitB = searchAnnotations.find((r) => r.id === b.annotations[0]);
    return canvasIds.indexOf(hitA.targetId) - canvasIds.indexOf(hitB.targetId);
  });
  const searchNumTotal = (data?.pages?.[0] ?? {}).within?.total;

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
        <SearchHitsAndAnnotations
          companionWindowId={companionWindowId}
          containerRef={containerRef}
          searchAnnotations={searchAnnotations}
          searchHits={searchHits}
          windowId={windowId}
          focused={focused}
          toggleFocus={toggleFocus}
        />
      </List>
      {hasNextPage && (
        <Button
          sx={{ width: '100%' }}
          color="secondary"
          onClick={() => fetchNextPage()}
        >
          {t('moreResults')}
          <br />
          {`(${t('searchResultsRemaining', { numLeft: searchNumTotal - searchHits.length })})`}
        </Button>
      )}
    </>
  );
}

SearchResults.propTypes = {
  canvases: PropTypes.arrayOf(PropTypes.object),
  companionWindowId: PropTypes.string.isRequired,
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  data: PropTypes.object,
  fetchSearch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
  query: PropTypes.string,
  searchAnnotations: PropTypes.arrayOf(PropTypes.object),
  searchHits: PropTypes.arrayOf(PropTypes.object),
  searchNumTotal: PropTypes.number,
  windowId: PropTypes.string.isRequired,
};
