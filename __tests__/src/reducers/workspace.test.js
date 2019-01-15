import reducer from '../../../src/reducers/workspace';
import ActionTypes from '../../../src/action-types';

describe('workspace reducer', () => {
  it('should handle FOCUS_WINDOW', () => {
    expect(
      reducer([], {
        type: ActionTypes.FOCUS_WINDOW,
        windowId: 'abc123'
      })
    ).toEqual({
      focusedWindowId: 'abc123'
    });
  });
});
