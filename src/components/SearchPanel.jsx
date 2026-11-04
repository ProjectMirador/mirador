import { forwardRef, useRef, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebounce } from 'use-debounce'
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVisibleCanvasIds,
  getCanvases,
  getSelectedAnnotationId,
  getCurrentAnnotationId,
  getSearchQuery,
  getWindow,
  getManifestSearchService,
  getThemeDirection,
  getManifestAutocompleteService,
} from '../state/selectors';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'react-i18next';
import CompanionWindow from '../containers/CompanionWindow';
import { useGetIiifContentSearchInfiniteQuery, useGetContentSearchAutocompleteQuery } from '../state/api/iiifContentSearchApiSlice';
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftSharp';
import ChevronRightIcon from '@mui/icons-material/ChevronRightSharp';


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
 * suggested search queries
 * autocomplete
 *
 * TODO:
 * select the first search result after receiving search results
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

const SearchHit = forwardRef(
  ({ result: { hit, annotations }, focusedAnnotationId = undefined, onFocus, index, selected = false, windowId, companionWindowId }, ref) => {
    const dispatch = useDispatch();
    const handleClick = () => {
      dispatch(selectAnnotation(windowId, annotations[0]?.id, annotations[0]?.targetId, companionWindowId));
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
  },
);

SearchHit.displayName = 'SearchHit';
SearchHit.propTypes = {
  companionWindowId: PropTypes.string,
  focusedAnnotationId: PropTypes.string,
  index: PropTypes.number.isRequired,
  result: PropTypes.shape({
    hit: PropTypes.object,
    annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  onFocus: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
};

SearchHit.defaultProps = {
  focusedAnnotationId: undefined,
  selected: false,
};

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

function SearchBar({ query = '', submit, windowId }) {
  const { t } = useTranslation();
  const [input, setInput] = useState(query)
  const endpoint = useSelector((state) => getManifestSearchService(state, { windowId }))?.id;
  const autocompleteEndpoint = useSelector((state) => getManifestAutocompleteService(state, { windowId }))?.id

  const { data, isFetching } = useGetIiifContentSearchInfiniteQuery({ endpoint, query }, { skip: query?.length === 0 });


  const { autocompleteData, autocompleteIsFetching } = useGetContentSearchAutocompleteQuery({ autocompleteEndpoint, input }, { skip: input?.length < 2 });

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

SearchBar.propTypes = {
  query: PropTypes.string,
  submit: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

function SearchNavigation({ data, companionWindowId, windowId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const direction = useSelector((state) => getThemeDirection(state));

  const currentAnnotationId = useSelector((state) => getCurrentAnnotationId(state, { companionWindowId, windowId }) ?? data?.results?.[0]?.annotations?.[0]?.id);

  const currentHitIndex = data?.results?.findIndex((result) =>
    result?.annotations?.some((annotation) => annotation?.id === currentAnnotationId),
  ) || 0;

  const searchNumTotal = data?.pages?.[0]?.within?.total || (data?.results?.length ?? 0);
  const hasPreviousResult = currentHitIndex > 0;
  const hasNextResult = currentHitIndex < searchNumTotal - 1;

  const previousSearchResult = (currentHitIndex) => {
    const result = data?.results?.[currentHitIndex - 1];
    const annotations = result?.annotations ?? [];
    if (annotations.length > 0) {
      dispatch(selectAnnotation(windowId, annotations[0]?.id, annotations[0]?.targetId, companionWindowId));
    }
  };

  const nextSearchResult = (currentHitIndex) => {
    const result = data?.results?.[currentHitIndex + 1];
    const annotations = result?.annotations ?? [];
    if (annotations.length > 0) {
      dispatch(selectAnnotation(windowId, annotations[0]?.id, annotations[0]?.targetId, companionWindowId));
    }
  };

  const iconStyle = direction === 'rtl' ? { transform: 'rotate(180deg)' } : {};

  if (data.results?.length === 0) return null;

  return (
    <Typography variant="body2" align="center">
      <MiradorMenuButton
        aria-label={t('searchPreviousResult')}
        disabled={!hasPreviousResult}
        onClick={() => previousSearchResult(currentHitIndex)}
      >
        <ChevronLeftIcon style={iconStyle} />
      </MiradorMenuButton>
      <span style={{ unicodeBidi: 'plaintext' }} role="status">
        {t('pagination', { current: currentHitIndex + 1, total: searchNumTotal })}
      </span>
      <MiradorMenuButton
        aria-label={t('searchNextResult')}
        disabled={!hasNextResult}
        onClick={() => nextSearchResult(currentHitIndex)}
      >
        <ChevronRightIcon style={iconStyle} />
      </MiradorMenuButton>
    </Typography>
  );
}

export function SearchPanel({ id, windowId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const endpoint = useSelector((state) => getManifestSearchService(state, { windowId }))?.id;

  const query = useSelector((state) => getSearchQuery(state, { companionWindowId: id, windowId }));
  const setQuery = (q) => dispatch(requestSearch(windowId, id, q));
  const hasQuery = query && query !== '';

  const [focusedAnnotationId, setFocusedAnnotationId] = useState(null);
  const selectedAnnotationId = useSelector((state) => getSelectedAnnotationId(state, { windowId }));
  const currentAnnotationId = useSelector((state) => getCurrentAnnotationId(state, { companionWindowId: id, windowId }));
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

    if (currentAnnotationId) {
      const resultWithCurrentAnnotation = contentSearchResult?.results?.find((result) =>
        result?.annotations?.some((annotation) => annotation?.id === currentAnnotationId),
      );
      if (resultWithCurrentAnnotation) return resultWithCurrentAnnotation;
    }

    return contentSearchResult?.results?.find((result) =>
      visibleCanvasIds.some((canvasId) => result?.annotations?.some((annotation) => annotation?.targetId === canvasId)),
    );
  }, [contentSearchResult, visibleCanvasIds, selectedAnnotationId, currentAnnotationId]);

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
      titleControls={<>
        <SearchBar key={query} query={query} submit={setQuery} windowId={windowId} />
        <SearchNavigation data={contentSearchResult} companionWindowId={id} windowId={windowId} />
      </>}
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
            scrollTo={bestResultToScrollTo === result}
          >
            <SearchHit
              key={`${result?.annotations?.[0]?.id}-hit`}
              companionWindowId={id}
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

SearchPanel.propTypes = {
  windowId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
