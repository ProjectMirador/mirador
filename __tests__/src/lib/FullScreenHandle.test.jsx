import { act, render, screen } from '@tests/utils/test-utils';
import { renderHook } from '@testing-library/react';
import { useFullScreenHandle, FullScreen } from '../../../src/lib/FullScreenHandle';

describe('FullScreenHandle', () => {
  describe('useFullScreenHandle', () => {
    let requestFullscreen;
    let exitFullscreen;

    beforeEach(() => {
      requestFullscreen = vi.fn().mockResolvedValue();
      exitFullscreen = vi.fn().mockResolvedValue();
      document.body.requestFullscreen = requestFullscreen;
      document.exitFullscreen = exitFullscreen;
      // eslint-disable-next-line testing-library/no-node-access -- mocking the global Fullscreen API, not querying rendered output
      document.fullscreenElement = null;
    });

    afterEach(() => {
      delete document.body.requestFullscreen;
      delete document.exitFullscreen;
      // eslint-disable-next-line testing-library/no-node-access -- mocking the global Fullscreen API, not querying rendered output
      delete document.fullscreenElement;
    });

    it('starts inactive', () => {
      const { result } = renderHook(() => useFullScreenHandle());

      expect(result.current.active).toBe(false);
    });

    it('enter() requests fullscreen on document.body when not already fullscreen', async () => {
      const { result } = renderHook(() => useFullScreenHandle());

      await act(async () => {
        await result.current.enter();
      });

      expect(requestFullscreen).toHaveBeenCalledTimes(1);
      expect(exitFullscreen).not.toHaveBeenCalled();
    });

    it('exit() does nothing when not in fullscreen', async () => {
      const { result } = renderHook(() => useFullScreenHandle());

      await act(async () => {
        await result.current.exit();
      });

      expect(exitFullscreen).not.toHaveBeenCalled();
    });

    it('becomes active when a fullscreenchange event reports document.body as the fullscreen element', () => {
      const { result } = renderHook(() => useFullScreenHandle());

      act(() => {
        // eslint-disable-next-line testing-library/no-node-access -- mocking the global Fullscreen API, not querying rendered output
        document.fullscreenElement = document.body;
        document.dispatchEvent(new Event('fullscreenchange'));
      });

      expect(result.current.active).toBe(true);
    });

    it('exit() calls document.exitFullscreen once active', async () => {
      const { result } = renderHook(() => useFullScreenHandle());

      act(() => {
        // eslint-disable-next-line testing-library/no-node-access -- mocking the global Fullscreen API, not querying rendered output
        document.fullscreenElement = document.body;
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
