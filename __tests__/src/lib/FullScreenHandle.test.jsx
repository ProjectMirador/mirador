import { act, render, screen } from '@tests/utils/test-utils';
import { renderHook } from '@testing-library/react';
import { useFullScreenHandle, FullScreen } from '../../../src/lib/FullScreenHandle';

describe('FullScreenHandle', () => {
  describe('useFullScreenHandle', () => {
    let requestFullscreen;
    let exitFullscreen;
    let element;

    /** Renders the hook and attaches its ref to a mock element, as <FullScreen> would */
    const renderHandle = () => {
      const hook = renderHook(() => useFullScreenHandle());
      hook.result.current.fullscreenRef.current = element;
      return hook;
    };

    beforeEach(() => {
      requestFullscreen = vi.fn().mockResolvedValue();
      exitFullscreen = vi.fn().mockResolvedValue();
      element = document.createElement('div');
      element.requestFullscreen = requestFullscreen;
      document.exitFullscreen = exitFullscreen;
      // eslint-disable-next-line testing-library/no-node-access -- mocking the global Fullscreen API, not querying rendered output
      document.fullscreenElement = null;
    });

    afterEach(() => {
      delete document.exitFullscreen;
      // eslint-disable-next-line testing-library/no-node-access -- mocking the global Fullscreen API, not querying rendered output
      delete document.fullscreenElement;
    });

    it('starts inactive', () => {
      const { result } = renderHook(() => useFullScreenHandle());

      expect(result.current.active).toBe(false);
    });

    it('enter() requests fullscreen on the ref element when not already fullscreen', async () => {
      const { result } = renderHandle();

      await act(async () => {
        await result.current.enter();
      });

      expect(requestFullscreen).toHaveBeenCalledTimes(1);
      expect(exitFullscreen).not.toHaveBeenCalled();
    });

    it('exit() does nothing when not in fullscreen', async () => {
      const { result } = renderHandle();

      await act(async () => {
        await result.current.exit();
      });

      expect(exitFullscreen).not.toHaveBeenCalled();
    });

    it('becomes active when a fullscreenchange event reports the ref element as the fullscreen element', () => {
      const { result } = renderHandle();

      act(() => {
        // eslint-disable-next-line testing-library/no-node-access -- mocking the global Fullscreen API, not querying rendered output
        document.fullscreenElement = element;
        document.dispatchEvent(new Event('fullscreenchange'));
      });

      expect(result.current.active).toBe(true);
    });

    it('exit() calls document.exitFullscreen once active', async () => {
      const { result } = renderHandle();

      act(() => {
        // eslint-disable-next-line testing-library/no-node-access -- mocking the global Fullscreen API, not querying rendered output
        document.fullscreenElement = element;
        document.dispatchEvent(new Event('fullscreenchange'));
      });

      await act(async () => {
        await result.current.exit();
      });

      expect(exitFullscreen).toHaveBeenCalledTimes(1);
    });
  });

  describe('FullScreen', () => {
    it('renders children without the fullscreen-enabled class when inactive', () => {
      render(
        <FullScreen handle={{ active: false }} className="my-class">
          <span>content</span>
        </FullScreen>,
      );

      // eslint-disable-next-line testing-library/no-node-access -- the wrapper div has no role/testid to query directly
      const wrapper = screen.getByText('content').parentElement;
      expect(wrapper).toHaveClass('fullscreen', 'my-class');
      expect(wrapper).not.toHaveClass('fullscreen-enabled');
    });

    it('applies the fullscreen-enabled class and full-size styles when active', () => {
      render(
        <FullScreen handle={{ active: true }}>
          <span>content</span>
        </FullScreen>,
      );

      // eslint-disable-next-line testing-library/no-node-access -- the wrapper div has no role/testid to query directly
      const wrapper = screen.getByText('content').parentElement;
      expect(wrapper).toHaveClass('fullscreen-enabled');
      expect(wrapper).toHaveStyle({ height: '100%', width: '100%' });
    });

    it('attaches the handle ref to the wrapper element', () => {
      const handle = { active: false, fullscreenRef: { current: null } };
      render(
        <FullScreen handle={handle}>
          <span>content</span>
        </FullScreen>,
      );

      // eslint-disable-next-line testing-library/no-node-access -- the wrapper div has no role/testid to query directly
      expect(handle.fullscreenRef.current).toBe(screen.getByText('content').parentElement);
    });

    it('calls onChange with the active state whenever it changes', () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <FullScreen handle={{ active: false }} onChange={onChange}>
          <span>content</span>
        </FullScreen>,
      );

      expect(onChange).toHaveBeenCalledWith(false, { active: false });

      rerender(
        <FullScreen handle={{ active: true }} onChange={onChange}>
          <span>content</span>
        </FullScreen>,
      );

      expect(onChange).toHaveBeenCalledWith(true, { active: true });
    });
  });
});
