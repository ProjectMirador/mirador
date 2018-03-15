import reducer from '../../reducers/manifests';
import ActionTypes from '../../action-types';

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
          content: 'lots of canvases and metadata and such',
        },
      },
    )).toEqual({
      abc123: {
        isFetching: false,
        json: {
          id: 'abc123',
          content: 'lots of canvases and metadata and such',
        },
      },
    });
  });
});
