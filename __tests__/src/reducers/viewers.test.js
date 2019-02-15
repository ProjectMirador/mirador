import { viewersReducer } from '../../../src/state/reducers/viewers';
import ActionTypes from '../../../src/state/actions/action-types';

describe('viewers reducer', () => {
  it('should handle UPDATE_VIEWPORT', () => {
    expect(viewersReducer({
      abc123: {
        x: 1,
      },
      def456: {
        y: 1,
      },
    }, {
      type: ActionTypes.UPDATE_VIEWPORT,
      windowId: 'abc123',
      payload: { x: 0, y: 1, zoom: 0.5 },
    })).toEqual({
      abc123: {
        x: 0,
        y: 1,
        zoom: 0.5,
      },
      def456: {
        y: 1,
      },
    });
  });
  it('should handle REMOVE_WINDOW', () => {
    expect(viewersReducer({
      abc123: {
        foo: 'bar',
      },
      def456: {
        foo: 'bar',
      },
    }, {
      type: ActionTypes.REMOVE_WINDOW,
      windowId: 'abc123',
    })).toEqual({
      def456: {
        foo: 'bar',
      },
    });
  });
});
