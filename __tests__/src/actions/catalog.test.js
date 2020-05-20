import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/state/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addResource', () => {
  let store = null;
  beforeEach(() => {
    store = mockStore({});
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' })); // eslint-disable-line no-undef
  });

  it('dispatches ADD_RESOURCE', () => {
    store.dispatch(actions.addResource('https://purl.stanford.edu/sn904cj3429/iiif/manifest'));
    expect(store.getActions()[0]).toEqual({
      manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
      type: 'mirador/ADD_RESOURCE',
    });
  });

  it('dispatches the REQUEST_MANIFEST action', () => {
    store.dispatch(actions.addResource('https://purl.stanford.edu/sn904cj3429/iiif/manifest'));
    expect(store.getActions()[1]).toEqual({
      manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
      properties: { isFetching: true },
      type: 'mirador/REQUEST_MANIFEST',
    });
  });
});

describe('removeResource', () => {
  it('dispatches REMOVE_RESOURCE', () => {
    expect(actions.removeResource('some-url')).toEqual({
      manifestId: 'some-url',
      type: 'mirador/REMOVE_RESOURCE',
    });
  });
});
