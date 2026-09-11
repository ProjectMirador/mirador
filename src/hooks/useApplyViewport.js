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
 * A multi-canvas transition can trigger animation-finish events unrelated
 * to this hook's own call (each canvas's own <TileSource> settles its
 * placement independently), so isApplying stays on until a report
 * actually matches what we told OSD to do; anything else in between is
 * mid-transition noise, not a user gesture.
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
    const immediately = !stateRef.current.hasApplied || canvasChanged;

    runOnceVisible(viewer.element, () => {
      applyViewport(viewer.viewport, desiredViewport, { immediately });
      // An immediate pan/zoom sets spring values without flagging a
      // redraw, so OSD's own draw loop has no reason to repaint.
      viewer.forceRedraw();

      appliedRef.current = desiredViewport;
      stateRef.current.hasApplied = true;
      stateRef.current.canvasKey = desiredViewport.canvasKey;
      stateRef.current.isApplying = true;
      stateRef.current.expected = {
        x: viewer.viewport.centerSpringX.target.value,
        y: viewer.viewport.centerSpringY.target.value,
        zoom: viewer.viewport.zoomSpring.target.value,
      };

      // Time-limits isApplying so it can't stay "on" forever if a settle
      // confirmation never arrives. `immediately: false` animations can last for up
      // to viewer.animationTime, so this fallback has to stay longer than that
      const settleTimeoutMs = viewer.animationTime * 1000 + SETTLE_TIMEOUT_MARGIN_MS;

      clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = setTimeout(() => {
        stateRef.current.isApplying = false;
      }, settleTimeoutMs);
    });
  }, [viewer, desiredViewport, runOnceVisible]);

  useEffect(() => () => clearTimeout(settleTimeoutRef.current), []);

  return stateRef;
}
