import { useRef, useCallback, useEffect } from 'react';

/**
 * Returns a function that runs `apply` immediately if `element` is visible,
 * or waits (via IntersectionObserver) until it becomes visible and then runs
 * it once. Cancels any earlier still-pending wait when a newer call
 * supersedes it, and disconnects on unmount.
 */
export default function useDeferUntilVisible() {
  const pending = useRef(null);

  const runOnceVisible = useCallback((element, apply) => {
    const isVisible = typeof element.checkVisibility !== 'function' || element.checkVisibility();

    if (isVisible) {
      apply();
      return;
    }

    pending.current?.disconnect();

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      pending.current = null;
      apply();
    });

    pending.current = observer;
    observer.observe(element);
  }, []);

  useEffect(() => () => pending.current?.disconnect(), []);

  return runOnceVisible;
}
