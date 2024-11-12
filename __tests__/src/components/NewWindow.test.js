import { render } from '@tests/utils/test-utils';
import { NewWindow } from '../../../src/components/NewWindow';

/**
 * Helper function to create a shallow wrapper around ErrorDialog
 */
function createWrapper(props) {
  return render(
    <NewWindow
      url="http://example.com/"
      onClose={() => {}}
      {...props}
    />,
  );
}

describe('NewWindow', () => {
  it('renders properly and runs callbacks when the window closes', () => {
    const mockWindow = { close: vi.fn() };
    const open = vi.fn(() => mockWindow);
    const onClose = vi.fn();
    vi.useFakeTimers();

    createWrapper({ depWindow: { open }, onClose });
    expect(open).toHaveBeenCalledWith('http://example.com/', undefined, undefined);
    vi.runOnlyPendingTimers();
    expect(onClose).not.toBeCalled();
    mockWindow.closed = true;
    vi.runOnlyPendingTimers();
    expect(onClose).toBeCalled();
  });
});
