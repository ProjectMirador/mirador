import { renderHook } from '@testing-library/react';
import OpenSeadragon from 'openseadragon';
import useOsdEvent from '../../../src/hooks/useOsdEvent';

/** Build a real OSD Viewer (not a mock) so subscribe/unsubscribe timing is genuine */
function createViewer() {
  const element = document.createElement('div');
  document.body.appendChild(element);
  return new OpenSeadragon({ element });
}

describe('useOsdEvent', () => {
  it('does nothing when viewer is null', () => {
    expect(() => renderHook(() => useOsdEvent(null, 'update-viewport', vi.fn()))).not.toThrow();
  });

  it('subscribes to the named event on the viewer', () => {
    const viewer = createViewer();
    const viewerAddHandler = vi.spyOn(viewer, 'addHandler');

    renderHook(() => useOsdEvent(viewer, 'update-viewport', vi.fn()));
    expect(viewerAddHandler).toHaveBeenCalledWith('update-viewport', expect.any(Function));
  });

  // Regression test for #4526: a handler captured once at mount-time kept
  // reading stale state on every later invocation.
  it('always calls the latest handler passed in, never a stale one', () => {
    const viewer = createViewer();
    const handlerA = vi.fn();
    const handlerB = vi.fn();

    const { rerender } = renderHook(({ handler }) => useOsdEvent(viewer, 'update-viewport', handler), {
      initialProps: { handler: handlerA },
    });

    rerender({ handler: handlerB });
    viewer.raiseEvent('update-viewport');

    expect(handlerB).toHaveBeenCalledTimes(1);
    expect(handlerA).not.toHaveBeenCalled();
  });

  // Regression test for #4525: cleanup ran as a deferred passive effect,
  // leaving a window where a still-registered handler fired after unmount.
  it('stops responding to the event once unmounted', () => {
    const viewer = createViewer();
    const handler = vi.fn();

    const { unmount } = renderHook(() => useOsdEvent(viewer, 'update-viewport', handler));

    unmount();
    viewer.raiseEvent('update-viewport');

    expect(handler).not.toHaveBeenCalled();
  });

  it('re-subscribes if the viewer instance changes', () => {
    const viewerA = createViewer();
    const viewerB = createViewer();
    const handler = vi.fn();

    const { rerender } = renderHook(({ viewer }) => useOsdEvent(viewer, 'update-viewport', handler), {
      initialProps: { viewer: viewerA },
    });

    rerender({ viewer: viewerB });

    viewerA.raiseEvent('update-viewport');
    expect(handler).not.toHaveBeenCalled();

    viewerB.raiseEvent('update-viewport');
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
