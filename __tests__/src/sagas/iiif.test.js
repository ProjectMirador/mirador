import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import {
  fetchManifest,
  fetchResourceManifest,
} from '../../../src/state/sagas/iiif';
import {
  getConfig,
  getManifests,
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

  describe('fetchResourceManifest', () => {
    it('eagerly fetches the manifest for a resource', () => {
      fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
      const action = {
        manifestId: 'manifestId',
      };

      return expectSaga(fetchResourceManifest, action)
        .provide([
          [select(getConfig), {}],
          [select(getManifests), {}],
        ])
        .put({
          manifestId: 'manifestId',
          manifestJson: { data: '12345' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();
    });

    it('does nothing if the manifest is already present', () => {
      const action = {
        manifestId: 'manifestId',
      };

      return expectSaga(fetchResourceManifest, action)
        .provide([
          [select(getConfig), {}],
          [select(getManifests), { manifestId: {} }],
        ])
        .run().then(({ allEffects }) => allEffects.length === 0);
    });
  });
});
