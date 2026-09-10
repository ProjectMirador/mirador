import { useCallback } from 'react';
import useDeferUntilVisible from './useDeferUntilVisible';
import useOsdEvent from './useOsdEvent';

/**
 * Calls `onChange(viewer)` once for any 'add-item' or 'remove-item' raised
 * by `viewer.world` -- i.e. whenever the set of canvases actually on
 * screen changes -- deferred until the viewer's element is visible
 * (IntersectionObserver-backed via useDeferUntilVisible, see #3540: OSD
 * can't compute a fit against a zero-size element, e.g. an inactive tab).
 *
 * Deliberately offers no way to subscribe to only 'add-item' or only
 * 'remove-item': a view-type switch that lands on an already-visible
 * canvas fires only 'remove-item' for the departing canvas, never
 * 'add-item' for the survivor (see #4527). Treating "canvas set changed"
 * as one concept makes that bug unrepresentable through this hook.
 */
export default function useOsdCanvasChange(viewer, onChange, { deferUntilVisible = true } = {}) {
  const runOnceVisible = useDeferUntilVisible();

  const handleWorldChange = useCallback(() => {
    if (!viewer) return;

    if (deferUntilVisible) {
      runOnceVisible(viewer.element, () => onChange(viewer));
    } else {
      onChange(viewer);
    }
  }, [viewer, onChange, deferUntilVisible, runOnceVisible]);

  useOsdEvent(viewer, 'add-item', handleWorldChange);
  useOsdEvent(viewer, 'remove-item', handleWorldChange);
}
