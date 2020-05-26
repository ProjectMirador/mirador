import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import {
  fetchManifest,
} from '../../../src/state/sagas/iiif';
import {
  getConfig,
} from '../../../src/state/selectors';

describe('IIIF sagas', () => {
  describe('fetchManifest', () => {
    it('fetches a IIIF manifest', () => {
      fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
      const action = {
        manifestId: 'manifestId',
      };

      return expectSaga(fetchManifest, action)
        .provide([
          [select(getConfig), {}],
        ])
        .put({
          manifestId: 'manifestId',
          manifestJson: { data: '12345' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();
    });

    it('handles failures', () => {
      fetch.mockResponseOnce('<h1>Not Json</h1>');
      const action = {
        manifestId: 'manifestId',
      };

      return expectSaga(fetchManifest, action)
        .provide([
          [select(getConfig), {}],
        ])
        .put.actionType('mirador/RECEIVE_MANIFEST_FAILURE')
        .run();
    });
  });
});
