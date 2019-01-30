import reducer from '../../../src/state/reducers/infoResponses';
import ActionTypes from '../../../src/state/actions/action-types';

describe('info response reducer', () => {
  it('should handle REQUEST_INFO_RESPONSE', () => {
    expect(reducer({}, {
      type: ActionTypes.REQUEST_INFO_RESPONSE,
      infoId: 'abc123',
    })).toEqual({
      abc123: {
        id: 'abc123',
        isFetching: true,
      },
    });
  });
  it('should handle RECEIVE_INFO_RESPONSE', () => {
    expect(reducer(
      {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
      {
        type: ActionTypes.RECEIVE_INFO_RESPONSE,
        infoId: 'abc123',
        infoJson: {
          id: 'abc123',
          '@type': 'sc:Manifest',
          content: 'lots of canvases and metadata and such',
        },
      },
    )).toMatchObject({
      abc123: {
        id: 'abc123',
        isFetching: false,
        json: {},
      },
    });
  });
  it('should handle RECEIVE_INFO_RESPONSE_FAILURE', () => {
    expect(reducer(
      {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
      {
        type: ActionTypes.RECEIVE_INFO_RESPONSE_FAILURE,
        infoId: 'abc123',
        error: "This institution didn't enable CORS.",
      },
    )).toEqual({
      abc123: {
        id: 'abc123',
        isFetching: false,
        error: "This institution didn't enable CORS.",
      },
    });
  });
  it('should handle REMOVE_INFO_RESPONSE', () => {
    expect(reducer(
      {
        abc123: {
          id: 'abc123',
          stuff: 'foo',
        },
        def456: {
          id: 'def456',
          stuff: 'foo',
        },
      },
      {
        type: ActionTypes.REMOVE_INFO_RESPONSE,
        infoId: 'abc123',
      },
    )).toEqual({
      def456: {
        id: 'def456',
        stuff: 'foo',
      },
    });
  });
});
