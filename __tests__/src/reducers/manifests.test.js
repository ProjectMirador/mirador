import { manifestsReducer } from '../../../src/state/reducers/manifests';
import ActionTypes from '../../../src/state/actions/action-types';

describe('manifests reducer', () => {
  it('should handle REQUEST_MANIFEST', () => {
    expect(manifestsReducer({}, {
      type: ActionTypes.REQUEST_MANIFEST,
      manifestId: 'abc123',
    })).toEqual({
      abc123: {
        id: 'abc123',
      },
    });
  });
  it('should handle RECEIVE_MANIFEST', () => {
    expect(manifestsReducer(
      {
        abc123: {
          id: 'abc123',
          isFetching: true,
          error: 'Error fetching manifest',
        },
      },
      {
        type: ActionTypes.RECEIVE_MANIFEST,
        manifestId: 'abc123',
        manifestJson: {
          id: 'abc123',
          '@type': 'sc:Manifest',
          content: 'lots of canvases and metadata and such',
        },
      },
    )).toMatchObject({
      abc123: {
        id: 'abc123',
        isFetching: false,
        json: {
          id: 'abc123',
          '@type': 'sc:Manifest',
          content: 'lots of canvases and metadata and such',
        },
        error: null,
      },
    });
  });

  it('should handle RECEIVE_MANIFEST_FAILURE', () => {
    expect(manifestsReducer(
      {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
      {
        type: ActionTypes.RECEIVE_MANIFEST_FAILURE,
        manifestId: 'abc123',
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
  it('should handle REMOVE_MANIFEST', () => {
    expect(manifestsReducer(
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
        type: ActionTypes.REMOVE_MANIFEST,
        manifestId: 'abc123',
      },
    )).toEqual({
      def456: {
        id: 'def456',
        stuff: 'foo',
      },
    });
  });
});
