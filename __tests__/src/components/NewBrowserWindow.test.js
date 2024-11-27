import { render } from 'test-utils';
import { NewBrowserWindow } from '../../../src/components/NewBrowserWindow';

jest.useFakeTimers();

/**
 * Helper function to create a shallow wrapper around ErrorDialog
 */
function createWrapper(props) {
  return render(
    <NewBrowserWindow
      url="http://example.com/"
      onClose={() => {}}
      {...props}
    />,
  );
}

describe('NewBrowserWindow', () => {
  it('renders properly and runs callbacks when the window closes', () => {
    const mockWindow = { close: jest.fn() };
    const open = jest.fn(() => mockWindow);
    const onClose = jest.fn();

    createWrapper({ depWindow: { open }, onClose });
    expect(open).toHaveBeenCalledWith('http://example.com/', undefined, undefined);
    jest.runOnlyPendingTimers();
    expect(onClose).not.toBeCalled();
    mockWindow.closed = true;
    jest.runOnlyPendingTimers();
    expect(onClose).toBeCalled();

    jest.useRealTimers();
  });
});
