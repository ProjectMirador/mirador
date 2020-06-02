import { call } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { importState } from '../../../src/state/sagas/app';
import { fetchManifest } from '../../../src/state/sagas/iiif';
import { fetchWindowManifest } from '../../../src/state/sagas/windows';

describe('app-level sagas', () => {
  describe('importState', () => {
    it('calls into fetchWindowManifest for each window', () => {
      const action = {
        state: {
          manifests: [],
          windows: [
            { id: 'x', manifestId: 'url' },
            { id: 'y', manifestId: 'url2' },
          ],
        },
      };

      testSaga(importState, action)
        .next()
        .all([
          call(fetchWindowManifest, { window: { id: 'x', manifestId: 'url' } }),
          call(fetchWindowManifest, { window: { id: 'y', manifestId: 'url2' } }),
        ]);
    });
    it('calls into fetchManifest for each manifest', () => {
      const action = {
        state: {
          manifests: { x: { id: 'x' } },
          windows: [],
        },
      };

      testSaga(importState, action)
        .next()
        .all([
          call(fetchManifest, { manifestId: 'x' }),
        ]);
    });
    it('does not fetchManifest if the manifest json was provided', () => {
      const action = {
        state: {
          manifests: { x: { id: 'x', json: '{}' } },
          windows: [],
        },
      };

      testSaga(importState, action)
        .next()
        .all([]);
    });
  });
});
