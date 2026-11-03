import { forwardRef, useRef, useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { getVisibleCanvasIds, getCanvases } from '../state/selectors';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { getManifestSearchService } from '../state/selectors';
import { useTranslation } from 'react-i18next';
import CompanionWindow from '../containers/CompanionWindow';
import { useGetIiifContentSearchInfiniteQuery } from '../state/api/iiifContentSearchApiSlice';
import AnnotationResource from '../lib/AnnotationResource';
import { selectAnnotation } from '../state/actions';
import TruncatedHit from '../lib/TruncatedHit';
import { ScrollTo } from './ScrollTo';

/**
 * DONE:
 * show search results (hits/annotations)
 * focus mode
 * highlight search results on the visible canvases
 * ScrollTo when you move canvases
 * 
 * TODO:
 * change canvas when clicking an annotation
 * add overlays
 * add gallery view badge
 * loading indicators
 * load more
 * autocomplete
 * suggested search queries
 */

const Counter = styled(Chip, { name: 'SearchHit', slot: 'counter' })(({ ownerState, theme }) => ({
  backgroundColor: theme.palette.hitCounter.default,
  ...(ownerState?.onCurrentlyVisibleCanvas && {
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
    annotations: resources.filter(resource => hit.annotations.some(a => resource.id === a))
  }
}

function normalizedAnnotation(annotation) {
  return {
    hit: undefined,
    annotations: [annotation]
  }
}

function normalizeContentSearchResult(data, canvasIds) {
  const hits = data?.pages?.flatMap(page => page?.hits ?? []);
  const resources = data?.pages?.flatMap(page => page?.resources ?? []).map(resource => new AnnotationResource(resource));
  
  const results = hits?.map(hit => normalizeHit(hit, resources) ) ?? resources?.map(resource => (normalizedAnnotation(resource)));

  const sortedResults = results?.sort((a, b) => {
    const canvasIndexForA = canvasIds.indexOf(a.annotations[0]?.targetId);
    const canvasIndexForB = canvasIds.indexOf(b.annotations[0]?.targetId);
    return canvasIndexForA - canvasIndexForB;
  });

  return { results: sortedResults, hits, resources };
}

const SearchHit = forwardRef(({ result: { hit, annotations }, containerRef, focusedAnnotationId, onFocus, index, windowId }, ref) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(selectAnnotation(windowId, annotations[0]?.id));
  };

  const visibleCanvasIds = useSelector(state => getVisibleCanvasIds(state, { windowId }));

  const annotationCanvasIds = annotations.map(annotation => annotation.targetId);
  const onCurrentlyVisibleCanvas = annotationCanvasIds.some(id => visibleCanvasIds.includes(id));

  const focused = focusedAnnotationId === annotations[0]?.id;

  if (focusedAnnotationId && !focused) {
    return null;
  }

  if (hit) {
    const renderedHit = focused ? hit : new TruncatedHit(hit);
    const wasTruncated = hit && (renderedHit.before !== hit.before || renderedHit.after !== hit.after);
    return (
      <ListItemButton onClick={handleClick} ref={ref}>
        <ListItemText>
        <Counter label={index + 1} ownerState={{ onCurrentlyVisibleCanvas: onCurrentlyVisibleCanvas }} /> {renderedHit.before} <strong>{renderedHit?.match}</strong> {renderedHit.after}
        {wasTruncated && <button onClick={onFocus}>more</button>}
        </ListItemText>
      </ListItemButton>
    );
  } else {
    return (
      <ListItemButton onClick={handleClick} ref={ref}>
        <Counter label={index + 1} ownerState={{ onCurrentlyVisibleCanvas: onCurrentlyVisibleCanvas }} /> {annotations[0]?.chars}
      </ListItemButton>
    );
  }

});

export function SearchPanel({ id, windowId }) {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const endpoint = useSelector(state => getManifestSearchService(state, { windowId }))?.id;
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [focusedAnnotationId, setFocusedAnnotationId] = useState(null);
  const canvasIds = useSelector(state => getCanvases(state, { windowId })).map(canvas => canvas.id);

  const visibleCanvasIds = useSelector(state => getVisibleCanvasIds(state, { windowId }));

  const { data, isFetching } = useGetIiifContentSearchInfiniteQuery({ endpoint, query }, { skip:  query?.length === 0 });
  const contentSearchResult = useMemo(() => normalizeContentSearchResult(data, canvasIds), [data, canvasIds]);

  const bestResultToScrollTo = useMemo(() => {
    return contentSearchResult?.results?.find(result =>
      visibleCanvasIds.some(canvasId => result?.annotations?.some(annotation => annotation?.targetId === canvasId))
    );
  }, [contentSearchResult, visibleCanvasIds])

  return (
    <CompanionWindow
      ariaLabel={t('searchTitle')}
      id={id}
      title={t('searchTitle')}
      ref={containerRef}
      windowId={windowId}>
        <form style={{ display: 'flex', gap: '8px', alignItems: 'center' }} onSubmit={(e) => { e.preventDefault(); setQuery(input) }}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button>{t('search')}</button>
        </form>
        {focusedAnnotationId && <button onClick={() => setFocusedAnnotationId(null)}>Back</button> }
        <List>
          {contentSearchResult?.results?.map((result, index) => (
            <ScrollTo
              containerRef={containerRef}
              key={`${result?.annotations?.[0]?.id}-scroll`}
              offsetTop={96} // offset for the height of the form above
              scrollTo={bestResultToScrollTo == result}
            >
              <SearchHit key={index} index={index} result={result} windowId={windowId} onFocus={() => setFocusedAnnotationId(result?.annotations?.[0]?.id)} focusedAnnotationId={focusedAnnotationId} containerRef={containerRef}  />
            </ScrollTo>
          ))}
        </List>
    </CompanionWindow>
  );
}
