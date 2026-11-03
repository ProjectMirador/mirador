import AnnotationList from './AnnotationList';

/**
 * Normalize IIIF Content Search (v1) response pages into a single list of
 * result entries, regardless of whether the service returned `hits`.
 *
 * Each entry is joined to its annotation and canvas once, here, so consumers
 * don't need to look annotations up by id.
 *
 * NOTE: AnnotationResource#id falls back to a random uuid when an annotation
 * has no @id, so callers should memoize on `pages` to keep ids (and React keys)
 * stable across renders.
 *
 * @param {Array<object>} pages      data.pages from useGetIiifContentSearchInfiniteQuery
 * @param {Array<string>} canvasIds  manifest canvas ids, in sequence order
 * @returns {{
 *   annotationsById: Object<string, import('./AnnotationResource').default>,
 *   results: Array<{
 *     annotation: (import('./AnnotationResource').default|undefined),
 *     annotationId: (string|undefined),
 *     canvasId: (string|undefined),
 *     canvasIndex: number,
 *     hit: (object|undefined),
 *   }>,
 *   total: (number|undefined),
 * }}
 */
export function normalizeSearchResults(pages = [], canvasIds = []) {
  // Every annotation across every page, keyed by id.
  // AnnotationList handles a single-object `resources` and provides targetId.
  const annotationsById = {};
  pages.forEach((page) => {
    new AnnotationList(page).resources.forEach((annotation) => {
      annotationsById[annotation.id] = annotation;
    });
  });

  // Hits mode if the service sent any; otherwise one entry per annotation
  // with no hit (SearchHit renders annotation.chars in that case).
  const rawHits = pages.flatMap((page) => page.hits ?? []);
  const entries =
    rawHits.length > 0
      ? rawHits.map((hit) => ({ annotationId: hit.annotations?.[0], hit }))
      : Object.keys(annotationsById).map((annotationId) => ({ annotationId, hit: undefined }));

  const canvasIndexById = new Map(canvasIds.map((id, index) => [id, index]));

  const results = entries.map((entry) => {
    const annotation = annotationsById[entry.annotationId];
    const canvasId = annotation?.targetId ?? undefined;

    return {
      ...entry,
      annotation,
      canvasId,
      // unknown canvases sort last
      canvasIndex: canvasIndexById.get(canvasId) ?? Number.MAX_SAFE_INTEGER,
    };
  });

  // Canvas order; sort is stable, so service order is kept within a canvas.
  results.sort((a, b) => a.canvasIndex - b.canvasIndex);

  return {
    annotationsById,
    results,
    total: pages[0]?.within?.total,
  };
}
