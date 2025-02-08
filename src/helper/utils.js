/**
 * Filter annotation with a query string. Search in ID and value
 * */
export const filterAnnotation = (annotations, query) => annotations.filter((annotation) => {
  // eslint-disable-next-line max-len
  const queryLowered = query.toLowerCase();
  console.log('Annotation', annotation);
  return annotation.id.toLowerCase().includes(queryLowered)
        || (annotation?.content && annotation?.content.toLowerCase().includes(queryLowered))
        || (annotation?.creator && annotation?.creator.toLowerCase().includes(queryLowered))
        || (annotation?.lastEditor && annotation?.lastEditor.toLowerCase().includes(queryLowered));
});
