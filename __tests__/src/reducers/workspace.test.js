import reducer from '../../../src/state/reducers/workspace';
import ActionTypes from '../../../src/state/actions/action-types';

describe('workspace reducer', () => {
  it('should handle FOCUS_WINDOW', () => {
    expect(reducer([], {
      type: ActionTypes.FOCUS_WINDOW,
      windowId: 'abc123',
    })).toEqual({
      focusedWindowId: 'abc123',
    });
  });
  it('should handle FULLSCREEN_WORKSPACE', () => {
    expect(reducer([], {
      type: ActionTypes.FULLSCREEN_WORKSPACE,
      fullscreen: true,
    })).toEqual({
      fullscreen: true,
    });
  });
  it('should handle UPDATE_WORKSPACE_MOSAIC_LAYOUT', () => {
    expect(reducer([], {
      type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT,
      layout: { foo: 'bar' },
    })).toEqual({
      layout: { foo: 'bar' },
    });
  });
});
