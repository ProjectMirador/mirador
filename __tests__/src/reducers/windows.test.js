import reducer from '../../../src/reducers/windows';
import ActionTypes from '../../../src/action-types';

describe('windows reducer', () => {
  it('should handle ADD_WINDOW', () => {
    expect(reducer({}, {
      type: ActionTypes.ADD_WINDOW,
      window: { id: 'abc123' },
    })).toEqual({
      abc123: {
        id: 'abc123',
      },
    });
  });
  it('should handle REMOVE_WINDOW', () => {
    expect(reducer({
      abc123: {
        id: 'abc123',
      },
      def456: {
        id: 'def456',
      },
    }, {
      type: ActionTypes.REMOVE_WINDOW,
      windowId: 'abc123',
    })).toEqual({
      def456: {
        id: 'def456',
      },
    });
  });
  it('should handle NEXT_CANVAS', () => {
    expect(reducer({
      abc123: {
        id: 'abc123',
        canvasIndex: 1,
      },
      def456: {
        id: 'def456',
        canvasIndex: 1,
      },
    }, {
      type: ActionTypes.NEXT_CANVAS,
      windowId: 'abc123',
    })).toEqual({
      abc123: {
        id: 'abc123',
        canvasIndex: 2,
      },
      def456: {
        id: 'def456',
        canvasIndex: 1,
      },
    });
  });
  it('should handle PREVIOUS_CANVAS', () => {
    expect(reducer({
      abc123: {
        id: 'abc123',
        canvasIndex: 4,
      },
      def456: {
        id: 'def456',
        canvasIndex: 1,
      },
    }, {
      type: ActionTypes.PREVIOUS_CANVAS,
      windowId: 'abc123',
    })).toEqual({
      abc123: {
        id: 'abc123',
        canvasIndex: 3,
      },
      def456: {
        id: 'def456',
        canvasIndex: 1,
      },
    });
  });
});
