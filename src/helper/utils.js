/**
 * Remove duplicate elements in array
 *
 * */
export const removeDuplicates = (arr) => [...new Map(arr.map(v => [v.id, v])).values()];

/**
 * Filter annotation with a query string. Search in ID and value
 * */
export const filterAnnotation = (annotations, query) => annotations.filter((annotation) => {
  // eslint-disable-next-line max-len
  const queryLowered = query.toLowerCase();
  return annotation.id.toLowerCase().includes(queryLowered) || annotation.content.toLowerCase().includes(queryLowered);
});
