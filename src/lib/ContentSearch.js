import { EMPTY_ARRAY } from '../state/selectors/utils';

export function responseToHits(response) {
  if (!response || response.isFetching || (!response.hits && !response.annotations)) return EMPTY_ARRAY;
  if (response.hits) return response.hits.flatMap((hit) => contentSearchV1Object(hit));
  return response.annotations.flatMap((annotation) => annotation.items.map((item) => contentSearchV2Object(item)));
}

function contentSearchV1Object(item) {
  return {
    annotationId: item.annotations[0],
    ...item,
  };
}

function contentSearchV2Object(item) {
  const match = item.target.selector.at(0);
  return {
    annotationId: item.target.source,
    match: match.exact,
    before: match.prefix,
    after: match.suffix,
  };
}
