// Only remove security related tags and attributes. Allow each other.
var liberal = {}; // No html at all. Only text will remain.

var noHtml = {
  ALLOWED_TAGS: []
}; // Presentation API 2 suggestion.

var iiif = {
  ALLOWED_ATTR: ['href', 'src', 'alt'],
  ALLOWED_TAGS: ['a', 'b', 'br', 'i', 'img', 'p', 'span']
}; // Rule set that is used in Mirador 2.

var mirador2 = {
  ALLOWED_ATTR: ['href', 'target', 'src', 'alt', 'dir'],
  ALLOWED_TAGS: ['a', 'b', 'br', 'i', 'img', 'p', 'span', 'strong', 'em', 'ul', 'ol', 'li']
};
export default {
  iiif: iiif,
  liberal: liberal,
  mirador2: mirador2,
  noHtml: noHtml
};