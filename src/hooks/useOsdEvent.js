import { useRef, useLayoutEffect } from 'react';

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
 */
export default function useOsdEvent(viewer, eventName, handler) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useLayoutEffect(() => {
    if (!viewer) return undefined;

    const stableHandler = (...args) => handlerRef.current?.(...args);

    viewer.addHandler(eventName, stableHandler);
    return () => viewer.removeHandler(eventName, stableHandler);
  }, [viewer, eventName]);
}
