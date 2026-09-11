import Openseadragon from 'openseadragon';

/** Shallow-compare two bounds arrays ([x, y, width, height]) */
export function isSameBounds(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.length === b.length && a.every((val, idx) => val === b[idx]);
}

/**
 * Compare canvasKey (an identity derived from the current canvasIds).
 * Two different canvases can declare identical dimensions (common for
 * scanned books/manuscripts with uniform page sizes), so bounds-equality
 * alone can't be trusted to detect a real canvas change s-- and a saved
 * x/y/zoom position is only meaningful for the canvas(es) it was
 * captured against, so this also gates whether that position still
 * applies at all (see applyViewport below).
 */
export function isSameCanvas(a, b) {
  return a?.canvasKey === b?.canvasKey;
}

/**
 * Compare two desired-viewport shapes ({ x, y, zoom, rotation, flip,
 * bounds, canvasKey }).
 */
export function isSameViewport(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  return (
    isSameCanvas(a, b) &&
    a.x === b.x &&
    a.y === b.y &&
    a.zoom === b.zoom &&
    a.rotation === b.rotation &&
    a.flip === b.flip &&
    isSameBounds(a.bounds, b.bounds)
  );
}

/**
 * Point an OSD viewport at `desiredViewport` -- a pure function of the
 * viewport instance and the desired state, with no dependency on OSD's
 * own content-loading events (add-item/remove-item/tile-loaded): camera
 * math only needs the Viewport object to exist. We have dimensions from
 * IIIF manifests without needing actual loaded pixels.
 *
 * `immediately: true` snaps (used for the first application, or whenever
 * bounds/canvas-set changed); `immediately: false` animates smoothly
 * (used when only an explicit x/y/zoom position is being updated within
 * the same canvas-set).
 *
 * Callers are responsible for only passing x/y/zoom that's actually
 * valid for the canvas currently being shown -- see
 * getDesiredViewport/isSameCanvas in OpenSeadragonViewer.jsx, which
 * strips a saved position whose canvasKey doesn't match the current one
 * (e.g. preserveMiradorViewport carrying a single page's zoomed-in position
 * into a new two-page spread) before it ever reaches here.
 */
export function applyViewport(viewport, { x, y, zoom, rotation, flip, bounds }, { immediately }) {
  if (immediately) {
    if (x != null && y != null) viewport.panTo(new Openseadragon.Point(x, y), true);
    if (zoom != null) viewport.zoomTo(zoom, new Openseadragon.Point(x, y), true);
    if (rotation != null && rotation !== viewport.getRotation()) viewport.setRotation(rotation);
    if (flip != null && (flip || false) !== viewport.getFlip()) viewport.setFlip(flip);

    if (!x && !y && !zoom) {
      if (bounds) {
        viewport.fitBounds(new Openseadragon.Rect(...bounds), true);
      } else {
        viewport.goHome(true);
      }
    }
    return;
  }

  if (x == null || y == null || zoom == null) return;

  if (
    Math.round(x) !== Math.round(viewport.centerSpringX.target.value) ||
    Math.round(y) !== Math.round(viewport.centerSpringY.target.value)
  ) {
    viewport.panTo(new Openseadragon.Point(x, y), false);
  }

  if (zoom !== viewport.zoomSpring.target.value) {
    viewport.zoomTo(zoom, new Openseadragon.Point(x, y), false);
  }

  if (rotation != null && rotation !== viewport.getRotation()) viewport.setRotation(rotation);
  if (flip != null && (flip || false) !== viewport.getFlip()) viewport.setFlip(flip);
}
