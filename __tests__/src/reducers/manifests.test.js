import reducer from '../../../src/reducers/manifests';
import ActionTypes from '../../../src/action-types';

describe('manifests reducer', () => {
  it('should handle REQUEST_MANIFEST', () => {
    expect(reducer({}, {
      type: ActionTypes.REQUEST_MANIFEST,
      manifestId: 'abc123',
    })).toEqual({
      abc123: {
        isFetching: true,
      },
    });
  });
  it('should handle RECEIVE_MANIFEST', () => {
    expect(reducer(
      {
        abc123: {
          isFetching: true,
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
        isFetching: false,
        manifestation: {},
      },
    });
  });
  it('should handle RECEIVE_MANIFEST_FAILURE', () => {
    expect(reducer(
      {
        abc123: {
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
        isFetching: false,
        error: "This institution didn't enable CORS.",
      },
    });
  });
  it('should handle REMOVE_MANIFEST', () => {
    expect(reducer(
      {
        abc123: {
          stuff: 'foo',
        },
      },
      {
        type: ActionTypes.REMOVE_MANIFEST,
        manifestId: 'abc123',
      },
    )).toEqual({});
  });
});
