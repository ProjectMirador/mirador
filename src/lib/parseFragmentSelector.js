const FRAGMENT_REGEX = /xywh=(?:(pixel|percent):)?(.+)$/;

/**
 * Parse the `xywh` value of a W3C Media Fragment (used by IIIF/WebAnnotation
 * targets and OpenAnnotation selectors). Supports the optional `pixel:` and
 * `percent:` prefixes defined by https://www.w3.org/TR/media-frags/#naming-space.
 *
 * `percent:` values are returned verbatim (0-100) along with their unit; callers
 * are responsible for scaling them against the canvas dimensions, since those are
 * not known at this layer.
 *
 * @param {String} fragmentString e.g. "www.example.com/#xywh=percent:25,25,50,50"
 * @returns {?{dimensions: number[], unit: ('pixel'|'percent')}}
 */
export default function parseFragmentSelector(fragmentString) {
  if (typeof fragmentString !== 'string') return null;

  const match = fragmentString.match(FRAGMENT_REGEX);
  if (!match) return null;

  return {
    dimensions: match[2].split(',').map(str => parseFloat(str)),
    unit: match[1] === 'percent' ? 'percent' : 'pixel',
  };
}
