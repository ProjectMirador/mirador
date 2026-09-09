import { renderHook } from '@testing-library/react';
import useDeferUntilVisible from '../../../src/hooks/useDeferUntilVisible';

describe('useDeferUntilVisible', () => {
  let disconnect;
  let observe;
  let intersectionCallback;

  beforeEach(() => {
    disconnect = vi.fn();
    observe = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function IntersectionObserverMock(callback) {
        intersectionCallback = callback;
        return { disconnect, observe };
      }),
    );
  });

  it('runs apply immediately when the element is already visible', () => {
    const apply = vi.fn();
    const element = { checkVisibility: vi.fn(() => true) };
    const { result } = renderHook(() => useDeferUntilVisible());

    result.current(element, apply);

    expect(apply).toHaveBeenCalledTimes(1);
    expect(observe).not.toHaveBeenCalled();
  });

  it('treats a missing checkVisibility as visible rather than throwing', () => {
    const apply = vi.fn();
    const element = {};
    const { result } = renderHook(() => useDeferUntilVisible());

    expect(() => result.current(element, apply)).not.toThrow();
    expect(apply).toHaveBeenCalledTimes(1);
    expect(observe).not.toHaveBeenCalled();
  });

  it('waits for visibility before running apply when the element is hidden', () => {
    const apply = vi.fn();
    const element = { checkVisibility: vi.fn(() => false) };
    const { result } = renderHook(() => useDeferUntilVisible());

    result.current(element, apply);

    expect(observe).toHaveBeenCalledWith(element);
    expect(apply).not.toHaveBeenCalled();

    intersectionCallback([{ isIntersecting: true }]);

    expect(apply).toHaveBeenCalledTimes(1);
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it('does nothing when the intersection callback reports not-yet-intersecting', () => {
    const apply = vi.fn();
    const element = { checkVisibility: vi.fn(() => false) };
    const { result } = renderHook(() => useDeferUntilVisible());

    result.current(element, apply);
    intersectionCallback([{ isIntersecting: false }]);

    expect(apply).not.toHaveBeenCalled();
    expect(disconnect).not.toHaveBeenCalled();
  });

  it('disconnects a still-pending observer instead of stacking a second one on a later call', () => {
    const apply = vi.fn();
    const element = { checkVisibility: vi.fn(() => false) };
    const { result } = renderHook(() => useDeferUntilVisible());

    result.current(element, apply);
    expect(observe).toHaveBeenCalledTimes(1);

    // called again while still hidden (e.g. another canvas change)
    result.current(element, apply);

    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledTimes(2);
  });

  it('disconnects a pending observer on unmount', () => {
    const apply = vi.fn();
    const element = { checkVisibility: vi.fn(() => false) };
    const { result, unmount } = renderHook(() => useDeferUntilVisible());

    result.current(element, apply);
    unmount();

    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
