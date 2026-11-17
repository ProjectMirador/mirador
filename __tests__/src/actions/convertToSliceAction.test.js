import convertToSliceAction from '../../../src/state/actions/convertToSliceAction';

describe('convertToSliceAction', () => {
  it('forwards a single object argument as-is', () => {
    const forwardedAction = vi.fn((payload) => ({ payload, type: 'slice/action' }));
    const creator = convertToSliceAction(forwardedAction, ['windowId', 'canvasId', 'payload']);

    creator({ canvasId: 'c1', some: 'data', windowId: 'w1' });

    expect(forwardedAction).toHaveBeenCalledWith({ canvasId: 'c1', some: 'data', windowId: 'w1' });
  });

  it('maps legacy positional arguments onto named payload keys', () => {
    const forwardedAction = vi.fn((payload) => ({ payload, type: 'slice/action' }));
    const creator = convertToSliceAction(forwardedAction, ['windowId', 'canvasId']);

    creator('w1', 'c1');

    expect(forwardedAction).toHaveBeenCalledWith({ canvasId: 'c1', windowId: 'w1' });
  });

  it('spreads a positional argument mapped to the special "payload" name', () => {
    const forwardedAction = vi.fn((payload) => ({ payload, type: 'slice/action' }));
    const creator = convertToSliceAction(forwardedAction, ['windowId', 'canvasId', 'payload']);

    creator('w1', 'c1', { some: 'data' });

    expect(forwardedAction).toHaveBeenCalledWith({ canvasId: 'c1', some: 'data', windowId: 'w1' });
  });
});
