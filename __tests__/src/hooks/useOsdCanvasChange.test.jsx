import { renderHook } from '@testing-library/react';
import OpenSeadragon from 'openseadragon';
import useOsdCanvasChange from '../../../src/hooks/useOsdCanvasChange';

/** Build a real OSD Viewer (not a mock) so subscribe/unsubscribe timing is genuine */
function createViewer() {
  const element = document.createElement('div');
  document.body.appendChild(element);
  return new OpenSeadragon({ element });
}

/**
 * Invoke the handler our hook registered for `eventName`, bypassing
 * `world.raiseEvent` (which would also trigger OSD's own internal
 * listeners that expect a real TiledImage payload we don't need here --
 * we only care that our own handler fires).
 */
function invokeRegisteredHandler(viewer, eventName) {
  const [, handler] = viewer.world.addHandler.mock.calls.find(([name]) => name === eventName);
  handler();
}

describe('useOsdCanvasChange', () => {
  it('does nothing when viewer is null', () => {
    expect(() => renderHook(() => useOsdCanvasChange(null, vi.fn()))).not.toThrow();
  });

  // Regression test for #4527: a view-type switch landing on an already-visible
  // canvas fires only 'remove-item' for the departing canvas, never 'add-item'
  // for the survivor. Both must trigger onChange.
  it('calls onChange for either add-item or remove-item', () => {
    const viewer = createViewer();
    vi.spyOn(viewer.world, 'addHandler');
    const onChange = vi.fn();

    renderHook(() => useOsdCanvasChange(viewer, onChange));

    invokeRegisteredHandler(viewer, 'add-item');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(viewer);

    invokeRegisteredHandler(viewer, 'remove-item');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  // Regression test for #3540: add-item/remove-item can fire while the
  // viewer's element has no rendered box (e.g. an inactive tab panel).
  it('defers onChange until the viewer element is visible', () => {
    const viewer = createViewer();
    vi.spyOn(viewer.world, 'addHandler');
    const onChange = vi.fn();
    let intersectionCallback;

    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function IntersectionObserverMock(callback) {
        intersectionCallback = callback;
        return { disconnect: vi.fn(), observe: vi.fn() };
      }),
    );
    viewer.element.checkVisibility = vi.fn(() => false);

    renderHook(() => useOsdCanvasChange(viewer, onChange));
    invokeRegisteredHandler(viewer, 'add-item');

    expect(onChange).not.toHaveBeenCalled();

    intersectionCallback([{ isIntersecting: true }]);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange immediately when deferUntilVisible is false, regardless of visibility', () => {
    const viewer = createViewer();
    vi.spyOn(viewer.world, 'addHandler');
    const onChange = vi.fn();
    viewer.element.checkVisibility = vi.fn(() => false);

    renderHook(() => useOsdCanvasChange(viewer, onChange, { deferUntilVisible: false }));
    invokeRegisteredHandler(viewer, 'add-item');

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
