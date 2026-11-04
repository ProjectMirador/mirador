import { forwardRef, useRef, useState, useMemo, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVisibleCanvasIds,
  getCanvases,
  getSelectedAnnotationId,
  getSearchQuery,
  getWindow,
  getManifestSearchService,
} from '../state/selectors';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'react-i18next';
import CompanionWindow from '../containers/CompanionWindow';
import { useGetIiifContentSearchInfiniteQuery } from '../state/api/iiifContentSearchApiSlice';
import AnnotationResource from '../lib/AnnotationResource';
import { selectAnnotation } from '../state/actions';
import TruncatedHit from '../lib/TruncatedHit';
import { ScrollTo } from './ScrollTo';
import { requestSearch } from '../state/actions/search';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/SearchSharp';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 * DONE:
 * show search results (hits/annotations)
 * focus mode
 * highlight search results on the visible canvases
 * ScrollTo when you move canvases
 * change canvas when clicking an annotation
 * add overlays
 * add gallery view badge
 * loading indicators
 * load more
 *
 * TODO:
 * autocomplete
 * suggested search queries
 */

const Counter = styled(Chip, { name: 'SearchHit', slot: 'counter' })(({ ownerState, theme }) => ({
  backgroundColor: theme.palette.hitCounter.default,
  ...(ownerState?.selected && {
    backgroundColor: theme.palette.highlights.primary,
  }),
  ...(!ownerState?.selected &&
    ownerState?.onCurrentlyVisibleCanvas && {
      backgroundColor: theme.palette.highlights.secondary,
    }),
  height: 30,
  marginRight: theme.spacing(1),
  typography: 'subtitle2',
  verticalAlign: 'inherit',
}));

function normalizeHit(hit, resources) {
  return {
    hit: hit,
    annotations: resources.filter((resource) => hit.annotations.some((a) => resource.id === a)),
  };
}

function normalizedAnnotation(annotation) {
  return {
    hit: undefined,
    annotations: [annotation],
  };
}

function normalizeContentSearchResult(data, canvasIds) {
  const hits = data?.pages?.flatMap((page) => page?.hits ?? []);
  const resources = data?.pages?.flatMap((page) => page?.resources ?? []).map((resource) => new AnnotationResource(resource));

  const results =
    hits?.map((hit) => normalizeHit(hit, resources)) ?? resources?.map((resource) => normalizedAnnotation(resource));

  const sortedResults = results?.sort((a, b) => {
    const canvasIndexForA = canvasIds.indexOf(a.annotations[0]?.targetId);
    const canvasIndexForB = canvasIds.indexOf(b.annotations[0]?.targetId);
    return canvasIndexForA - canvasIndexForB;
  });

  return { results: sortedResults, hits, resources };
}

const SearchHit = forwardRef(({ result: { hit, annotations }, focusedAnnotationId, onFocus, index, selected, windowId }, ref) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(selectAnnotation(windowId, annotations[0]?.id, annotations[0]?.targetId));
  };

  const visibleCanvasIds = useSelector((state) => getVisibleCanvasIds(state, { windowId }));

  const annotationCanvasIds = annotations.map((annotation) => annotation.targetId);
  const onCurrentlyVisibleCanvas = annotationCanvasIds.some((id) => visibleCanvasIds.includes(id));

  const focused = focusedAnnotationId === annotations[0]?.id;

  if (focusedAnnotationId && !focused) {
    return null;
  }

  if (hit) {
    const renderedHit = focused ? hit : new TruncatedHit(hit);
    const wasTruncated = hit && (renderedHit.before !== hit.before || renderedHit.after !== hit.after);
    return (
      <ListItemButton onClick={handleClick} ref={ref} divider>
        <ListItemText>
          <Counter label={index + 1} ownerState={{ onCurrentlyVisibleCanvas: onCurrentlyVisibleCanvas, selected: selected }} />{' '}
          {renderedHit.before} <strong>{renderedHit?.match}</strong> {renderedHit.after}
          {wasTruncated && <button onClick={onFocus}>more</button>}
        </ListItemText>
      </ListItemButton>
    );
  }
  return (
    <ListItemButton onClick={handleClick} ref={ref} divider>
      <Counter label={index + 1} ownerState={{ onCurrentlyVisibleCanvas: onCurrentlyVisibleCanvas, selected: selected }} />{' '}
      {annotations[0]?.chars}
    </ListItemButton>
  );
});

const SearchProgressIndicator = () => (
  <CircularProgress
    sx={{
      left: '50%',
      marginLeft: '-25px',
      marginTop: '-25px',
      position: 'absolute',
      top: '50%',
    }}
    size={50}
  />
);

function SearchBar({ query, submit, windowId }) {
  const { t } = useTranslation();
  const [input, setInput] = useState(query || '');
  const endpoint = useSelector((state) => getManifestSearchService(state, { windowId }))?.id;
  const { data, isFetching } = useGetIiifContentSearchInfiniteQuery({ endpoint, query }, { skip: query?.length === 0 });

  return (
    <form
      style={{ display: 'flex', gap: '8px', alignItems: 'center', marginRight: 8, paddingBottom: 8 }}
      onSubmit={(e) => {
        e.preventDefault();
        submit(input);
      }}
    >
      <TextField
        label={t('searchInputLabel')}
        value={input}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment sx={{ position: 'relative' }} position="end">
                <MiradorMenuButton aria-label={t('searchSubmitAria')} type="submit">
                  <SearchIcon />
                </MiradorMenuButton>
                {isFetching && <SearchProgressIndicator />}
              </InputAdornment>
            ),
          },
        }}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}

export function SearchPanel({ id, windowId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const endpoint = useSelector((state) => getManifestSearchService(state, { windowId }))?.id;

  const query = useSelector((state) => getSearchQuery(state, { companionWindowId: id, windowId }));
  const setQuery = (query) => dispatch(requestSearch(windowId, id, query));
  const hasQuery = query && query !== '';

  const [focusedAnnotationId, setFocusedAnnotationId] = useState(null);
  const selectedAnnotationId = useSelector((state) => getSelectedAnnotationId(state, { windowId }));
  const canvasIds = useSelector((state) => getCanvases(state, { windowId })).map((canvas) => canvas.id);

  const visibleCanvasIds = useSelector((state) => getVisibleCanvasIds(state, { windowId }));

  const { data, hasNextPage, fetchNextPage } = useGetIiifContentSearchInfiniteQuery(
    { endpoint, query },
    { skip: query?.length === 0 },
  );
  const contentSearchResult = useMemo(() => normalizeContentSearchResult(data, canvasIds), [data, canvasIds]);
  const searchNumTotal = data?.pages?.[0]?.within?.total;

  const { suggestedSearches } = useSelector((state) => getWindow(state, { windowId }));

  const bestResultToScrollTo = useMemo(() => {
    if (selectedAnnotationId) {
      const resultWithSelectedAnnotation = contentSearchResult?.results?.find((result) =>
        result?.annotations?.some((annotation) => annotation?.id === selectedAnnotationId),
      );
      if (resultWithSelectedAnnotation) return resultWithSelectedAnnotation;
    }

    return contentSearchResult?.results?.find((result) =>
      visibleCanvasIds.some((canvasId) => result?.annotations?.some((annotation) => annotation?.targetId === canvasId)),
    );
  }, [contentSearchResult, visibleCanvasIds, selectedAnnotationId]);

  return (
    <CompanionWindow
      ariaLabel={t('searchTitle')}
      id={id}
      title={
        <>
          {t('searchTitle')}
          {hasQuery && (
            <Chip
              aria-label={t('clearSearchAria')}
              role="button"
              sx={{ marginLeft: 1 }}
              color="secondary"
              label={t('clearSearch')}
              onClick={() => setQuery(null)}
              onDelete={() => setQuery(null)}
              size="small"
              tabIndex={0}
              variant="outlined"
            />
          )}
        </>
      }
      titleControls={<SearchBar key={query} query={query} submit={setQuery} windowId={windowId} />}
      ref={containerRef}
      windowId={windowId}
    >
      {focusedAnnotationId && <button onClick={() => setFocusedAnnotationId(null)}>Back</button>}
      <List>
        {contentSearchResult?.results?.map((result, index) => (
          <ScrollTo
            containerRef={containerRef}
            key={`${result?.annotations?.[0]?.id}-scroll`}
            offsetTop={96} // offset for the height of the form above
            scrollTo={bestResultToScrollTo == result}
          >
            <SearchHit
              key={index}
              index={index}
              result={result}
              windowId={windowId}
              selected={result?.annotations?.some((annotation) => annotation?.id === selectedAnnotationId)}
              onFocus={() => setFocusedAnnotationId(result?.annotations?.[0]?.id)}
              focusedAnnotationId={focusedAnnotationId}
              containerRef={containerRef}
            />
          </ScrollTo>
        ))}
      </List>
      {suggestedSearches &&
        !hasQuery &&
        suggestedSearches.map((search) => (
          <Typography component="p" key={search} variant="body1" sx={{ margin: 2 }}>
            <Button variant="inlineText" color="secondary" onClick={() => setQuery(search)}>
              {t('suggestSearch', { query: search })}
            </Button>
          </Typography>
        ))}
      {hasNextPage && (
        <Button sx={{ width: '100%' }} color="secondary" onClick={() => fetchNextPage()}>
          {t('moreResults')}
          <br />
          {searchNumTotal &&
            `(${t('searchResultsRemaining', { numLeft: searchNumTotal - contentSearchResult?.results?.length })})`}
        </Button>
      )}
    </CompanionWindow>
  );
}
