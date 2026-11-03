import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetIiifContentSearchInfiniteQuery } from '../state/api/iiifContentSearchApiSlice';
import {
  getCanvases,
  getManifestSearchService,
  getSearchQuery,
  getSelectedAnnotationId,
  getVisibleCanvasIds,
} from '../state/selectors';
import { normalizeSearchResults } from '../lib/searchUtils';

/**
 * Content search results for one search companion window.
 *
 * Components that call this with the same windowId/companionWindowId share a
 * single RTK Query cache entry (one request) and get the same normalized shape.
 *
 * @param {string} windowId
 * @param {string} companionWindowId
 */
export default function useSearchResults(windowId, companionWindowId) {
  const query = useSelector((state) => getSearchQuery(state, { companionWindowId, windowId }));
  const endpoint = useSelector((state) => getManifestSearchService(state, { windowId })?.id);
  const canvases = useSelector((state) => getCanvases(state, { windowId }));
  const selectedAnnotationId = useSelector((state) => getSelectedAnnotationId(state, { windowId }));
  const visibleCanvasIds = useSelector((state) => getVisibleCanvasIds(state, { windowId }));

  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage, isLoading } =
    useGetIiifContentSearchInfiniteQuery({ endpoint, query }, { skip: !query || !endpoint });

  const canvasIds = useMemo(() => canvases.map((canvas) => canvas.id), [canvases]);

  // memoized on data.pages so annotation ids (which may be generated) stay stable
  const normalized = useMemo(() => normalizeSearchResults(data?.pages, canvasIds), [data?.pages, canvasIds]);

  // The "current" result is derived, not stored:
  //  - the window's selected annotation, if it's one of these results
  //  - otherwise, the first result on the visible canvases
  //  - otherwise, none (-1)
  const currentIndex = useMemo(() => {
    const { results } = normalized;
    const selectedIndex = selectedAnnotationId
      ? results.findIndex((r) => r.annotationId === selectedAnnotationId || r.hit?.annotations?.includes(selectedAnnotationId))
      : -1;
    if (selectedIndex !== -1) return selectedIndex;

    return results.findIndex((r) => visibleCanvasIds.includes(r.canvasId));
  }, [normalized, selectedAnnotationId, visibleCanvasIds]);

  return {
    ...normalized,
    currentIndex,
    currentResult: normalized.results[currentIndex],
    visibleCanvasIds,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
    isLoading,
    query,
    selectedAnnotationId,
  };
}
