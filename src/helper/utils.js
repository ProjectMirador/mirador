/**
 * Filter annotation with a query string.
 * */
export const filterAnnotation = (annotations, query) => annotations.filter((annotation) => {
  // eslint-disable-next-line max-len
  const queryLowered = query.toLowerCase();
  console.log('Annotation', annotation);
  return annotation.id.toLowerCase().includes(queryLowered)
        || (annotation?.content && annotation?.content.toLowerCase().includes(queryLowered))
        || (annotation?.creator && annotation?.creator.toLowerCase().includes(queryLowered))
        || (annotation?.lastEditor && annotation?.lastEditor.toLowerCase().includes(queryLowered))
        || filterTagInAnnotation(annotation?.tags, query);
});

/**
 * Filter tags in annotation with a query string.
 * @param tags
 * @param query
 * @returns {boolean}
 */
export const filterTagInAnnotation = (tags, query) => {
  if (!tags || !tags.length) {
    return false;
  }
  const queryLowered = query.toLowerCase();
  const matchingTags = tags.filter((tag) => tag.toLowerCase().includes(queryLowered));
  return matchingTags.length > 0;
};

/**
 * Filter annotations by tags. Multiple tags can be selected.
 */
export const filterAnnotationByTags = (annotations, selectedTags) => {
  if (!selectedTags || !selectedTags.length) {
    return annotations;
  }
  return annotations.filter((annotation) => {
    const matchingTags = annotation?.tags.filter((tag) => selectedTags.includes(tag));
    return matchingTags.length > 0;
  });
};
