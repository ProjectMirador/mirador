import { probeResponsesReducer } from '../../../src/state/reducers/probeResponses';
import ActionTypes from '../../../src/state/actions/action-types';

describe('probe response reducer', () => {
  it('should handle REQUEST_PROBE_RESPONSE', () => {
    expect(probeResponsesReducer({}, {
      probeId: 'abc123',
      type: ActionTypes.REQUEST_PROBE_RESPONSE,
    })).toEqual({
      abc123: {
        id: 'abc123',
        isFetching: true,
      },
    });
  });
  it('should handle RECEIVE_PROBE_RESPONSE', () => {
    expect(probeResponsesReducer(
      {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
      {
        probeId: 'abc123',
        probeJson: {
          '@type': 'sc:Manifest',
          content: 'lots of canvases and metadata and such',
          id: 'abc123',
        },
        tokenServiceId: 'efg456',
        type: ActionTypes.RECEIVE_PROBE_RESPONSE,
      },
    )).toMatchObject({
      abc123: {
        id: 'abc123',
        isFetching: false,
        json: {},
        tokenServiceId: 'efg456',
      },
    });
  });
  it('should handle RECEIVE_PROBE_RESPONSE_FAILURE', () => {
    expect(probeResponsesReducer(
      {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
      {
        error: "This institution didn't enable CORS.",
        probeId: 'abc123',
        tokenServiceId: 'efg456',
        type: ActionTypes.RECEIVE_PROBE_RESPONSE_FAILURE,
      },
    )).toEqual({
      abc123: {
        error: "This institution didn't enable CORS.",
        id: 'abc123',
        isFetching: false,
        tokenServiceId: 'efg456',
      },
    });
  });
  it('should handle REMOVE_PROBE_RESPONSE', () => {
    expect(probeResponsesReducer(
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
        probeId: 'abc123',
        type: ActionTypes.REMOVE_PROBE_RESPONSE,
      },
    )).toEqual({
      def456: {
        id: 'def456',
        stuff: 'foo',
      },
    });
  });
  it('should handle IMPORT_MIRADOR_STATE setting to clean state', () => {
    expect(probeResponsesReducer({}, {
      state: { probeResponses: { new: 'stuff' } },
      type: ActionTypes.IMPORT_MIRADOR_STATE,
    })).toEqual({});
  });
});
