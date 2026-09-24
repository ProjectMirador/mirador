/** Parse the raw xywh values out of a fragment match -- percentage-relative or absolute, unconverted */
export function parsedFragment(match) {
  if (!match) return null;
  return match[1]
    .replace('percent:', '')
    .split(',')
    .map((str) => parseFloat(str, 10));
}

/** Whether a fragment match's coordinates are percentages of the canvas, not absolute pixels */
export function isPercentFragment(match) {
  return Boolean(match && match[1].includes('percent'));
}

/**
 * Resolves a fragment's coordinates to absolute pixels. A percentage-based
 * fragment (xywh=percent:...) is relative to the canvas's own coordinate
 * space, so it can only be resolved once a canvas is known -- deferred to
 * here, called by the two places that actually draw/hit-test a fragment,
 * rather than threading a canvas reference through every annotation
 * model/selector in between just to serve this one case.
 */
export function resolveFragment(fragment, isPercent, canvas) {
  if (!fragment || !isPercent) return fragment;
  const [x, y, width, height] = fragment;
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  return [(x / 100) * canvasWidth, (y / 100) * canvasHeight, (width / 100) * canvasWidth, (height / 100) * canvasHeight];
}
