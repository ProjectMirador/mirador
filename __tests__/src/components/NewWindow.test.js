import { render } from 'test-utils';
import { NewWindow } from '../../../src/components/NewWindow';

jest.useFakeTimers();

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
  });
});
