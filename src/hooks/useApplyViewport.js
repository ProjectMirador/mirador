import { useEffect, useRef } from 'react';
import useDeferUntilVisible from './useDeferUntilVisible';
import { applyViewport, isSameCanvas, isSameViewport } from '../lib/viewport';

const SETTLE_TIMEOUT_MARGIN_MS = 500;

/**
 * Applies `desiredViewport` to `viewer` whenever it meaningfully changes,
 * reacting purely to Redux-derived state, not OSD's own content-loading
 * events -- camera math only needs the Viewport object to exist, never
 * any TiledImage.
 *
 * Only a non-immediate apply is actually in flight after this effect
 * returns (a real spring animation Mirador itself is driving) --
 * immediate applies resolve synchronously via Spring.resetTo, so the
 * camera is already in its final position by the time this effect
 * returns. isApplying only guards the former: while a real Mirador-driven
 * animation is running, animation-finish events unrelated to it (each
 * canvas's own <TileSource> settling its own placement) are discarded as
 * mid-transition noise rather than mistaken for a user gesture, until a
 * report actually matches what we told OSD to do.
 *
 * Returns a ref, `{ hasApplied, isApplying, expected, canvasKey }`, for
 * the animation-finish handler that reports the viewport back to Redux.
 */
export default function useApplyViewport(viewer, desiredViewport) {
  const runOnceVisible = useDeferUntilVisible();
  const appliedRef = useRef(null);
  const stateRef = useRef({ canvasKey: undefined, expected: null, hasApplied: false, isApplying: false });
  const settleTimeoutRef = useRef(null);

  useEffect(() => {
    if (!viewer || !desiredViewport) return;
    if (isSameViewport(appliedRef.current, desiredViewport)) return;

    // Only a *transition* counts as a canvas change -- the very first
    // application has no previous canvas to compare against.
    const canvasChanged = stateRef.current.hasApplied && !isSameCanvas(appliedRef.current, desiredViewport);
    // A bounds/goHome fit (no explicit saved x/y/zoom) always snaps --
    // applyViewport's non-immediate path only knows how to animate toward
    // an explicit position, so without this a same-canvasKey update where
    // bounds only just became known (e.g. the manifest resolving after
    // canvasKey was already set) would silently do nothing, leaving
    // whatever the last immediate apply left behind (even a goHome() on a
    // still-empty world) stuck in place.
    const hasExplicitPosition = desiredViewport.x != null && desiredViewport.y != null && desiredViewport.zoom != null;
    const immediately = !stateRef.current.hasApplied || canvasChanged || !hasExplicitPosition;

    runOnceVisible(viewer.element, () => {
      applyViewport(viewer.viewport, desiredViewport, { immediately });
      // An immediate pan/zoom sets spring values without flagging a
      // redraw, so OSD's own draw loop has no reason to repaint.
      viewer.forceRedraw();

      appliedRef.current = desiredViewport;
      stateRef.current.hasApplied = true;
      stateRef.current.canvasKey = desiredViewport.canvasKey;

      clearTimeout(settleTimeoutRef.current);

      if (immediately) {
        // Nothing is actually animating -- resetTo already put the camera
        // in its final position, so reporting can resume right away.
        stateRef.current.isApplying = false;
        stateRef.current.expected = null;
        return;
      }

      stateRef.current.isApplying = true;
      stateRef.current.expected = {
        x: viewer.viewport.centerSpringX.target.value,
        y: viewer.viewport.centerSpringY.target.value,
        zoom: viewer.viewport.zoomSpring.target.value,
      };

      // Time-limits isApplying so it can't stay "on" forever if a settle
      // confirmation never arrives.
      const settleTimeoutMs = viewer.animationTime * 1000 + SETTLE_TIMEOUT_MARGIN_MS;
      settleTimeoutRef.current = setTimeout(() => {
        stateRef.current.isApplying = false;
      }, settleTimeoutMs);
    });
  }, [viewer, desiredViewport, runOnceVisible]);

  useEffect(() => () => clearTimeout(settleTimeoutRef.current), []);

  return stateRef;
}
