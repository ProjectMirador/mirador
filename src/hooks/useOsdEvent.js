import { useRef, useLayoutEffect } from 'react';

const WORLD_EVENTS = new Set(['add-item', 'remove-item']); // events that live on viewer.world, not viewer

/**
 * Subscribes `handler` to a raw OpenSeadragon event for as long as `viewer`
 * is non-null, unsubscribing in the same commit that `viewer` becomes null
 * or a different instance (useLayoutEffect, not useEffect -- see #4525:
 * a passive effect's cleanup can run after a portaled DOM ref is already
 * detached, leaving a stale handler registered against a dead ref).
 *
 * `handler` is read through a ref updated on every render, so passing a
 * fresh inline closure each render is always safe -- it can never go stale
 * the way a handler captured once at mount-time can (see #4526).
 *
 * Automatically binds to `viewer.world` instead of `viewer` for events that
 * only exist there (add-item/remove-item), so callers never need to
 * remember OSD's own viewer-vs-world event-source split.
 */
export default function useOsdEvent(viewer, eventName, handler) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useLayoutEffect(() => {
    if (!viewer) return undefined;

    const source = WORLD_EVENTS.has(eventName) ? viewer.world : viewer;
    const stableHandler = (...args) => handlerRef.current?.(...args);

    source.addHandler(eventName, stableHandler);
    return () => source.removeHandler(eventName, stableHandler);
  }, [viewer, eventName]);
}
