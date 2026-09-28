import { EMPTY_ARRAY } from '../state/selectors/utils';

/**
 * Normalizes a Content Search 1 or 2 response into a single, consistent
 * list of hits with the following shape:
 * { firstAnnotationId, annotationIds, match, before, after }
 * firstAnnotationId is a convenience for callers that only need one id.
 * annotationIds is the full, authoritative list -- a Content Search 1 hit
 * can reference more than one annotation, and a Content Search 2
 * annotation can have more than one selector, each becoming its own hit
 * here -- so callers that need to match against *any* of a hit's
 * annotations (rather than just the first) should use it instead.
 */
export function responseToHits(response) {
  if (!response || response.isFetching || (!response.hits && !response.annotations)) return EMPTY_ARRAY;
  if (response.hits) return response.hits.flatMap(contentSearchV1Hits);
  return response.annotations.flatMap((page) => page.items.flatMap(contentSearchV2Hits));
}

/** A Content Search 1 hit maps to exactly one normalized hit. */
function contentSearchV1Hits(hit) {
  return [
    {
      after: hit.after,
      annotationIds: hit.annotations,
      before: hit.before,
      firstAnnotationId: hit.annotations[0],
      match: hit.match,
    },
  ];
}

/**
 * A Content Search 2 annotation can have more than one selector (e.g. when
 * the same annotation matches the query in more than one place) -- produce
 * one hit per selector rather than only the first. A selector that isn't a
 * TextQuoteSelector (e.g. a FragmentSelector) has no text preview to show.
 */
function contentSearchV2Hits(item) {
  return (item.target.selector || []).map((selector) => ({
    after: selector.type === 'TextQuoteSelector' ? selector.suffix : undefined,
    annotationIds: [item.target.source],
    before: selector.type === 'TextQuoteSelector' ? selector.prefix : undefined,
    firstAnnotationId: item.target.source,
    match: selector.type === 'TextQuoteSelector' ? selector.exact : undefined,
  }));
}
