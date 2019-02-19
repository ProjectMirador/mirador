
// Only remove security related tags and attributes. Allow each other.
const liberal = {};

// No html at all. Only text will remain.
const noHtml = {
  ALLOWED_TAGS: [],
};

// Presentation API 2 suggestion.
const iiif = {
  ALLOWED_TAGS: ['a', 'b', 'br', 'i', 'img', 'p', 'span'],
  ALLOWED_ATTR: ['href', 'src', 'alt'],
};

// Rule set that is used in Mirador 2.
const mirador2 = {
  ALLOWED_TAGS: ['a', 'b', 'br', 'i', 'img', 'p', 'span', 'strong', 'em', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'target', 'src', 'alt', 'dir'],
};

export default {
  liberal,
  noHtml,
  iiif,
  mirador2,
};
