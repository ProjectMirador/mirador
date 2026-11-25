/**
 * Draft annotations: suggestions that are not published yet (e.g. written by
 * an assistant and waiting for review). Mirador draws them with the `draft`
 * palette (dashed outline) when `annotations.draftMarker` is configured.
 *
 * `draftMarker` is declarative so it survives saving and loading workspace
 * state: `{ property: 'status', value: 'draft' }` marks an annotation as a
 * draft when `annotation[property] === value` (`value` may be an array of
 * accepted values; `true` when omitted).
 */
export function isDraftAnnotation(annotationJson, draftMarker) {
  if (!annotationJson || !draftMarker || !draftMarker.property) return false;
  const actual = annotationJson[draftMarker.property];
  const expected = draftMarker.value === undefined ? true : draftMarker.value;
  return Array.isArray(expected) ? expected.includes(actual) : actual === expected;
}
