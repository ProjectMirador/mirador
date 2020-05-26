import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';

import ActionTypes from '../../../src/state/actions/action-types';
import { setCanvas } from '../../../src/state/actions';
import {
  getManifests, getManifestoInstance,
  getManifestSearchService, getCompanionWindowIdsForPosition,
} from '../../../src/state/selectors';
import { fetchManifest } from '../../../src/state/sagas/iiif';
import {
  fetchWindowManifest,
  setWindowDefaultSearchQuery,
  setWindowStartingCanvas,

} from '../../../src/state/sagas/windows';
import fixture from '../../fixtures/version-2/019.json';

describe('window-level sagas', () => {
  describe('fetchWindowManifest', () => {
    it('calls into fetchManifest for each window', () => {
      const action = {
        window: {
          id: 'x',
          manifestId: 'manifest.json',
        },
      };

      return expectSaga(fetchWindowManifest, action)
        .provide([
          [select(getManifests), {}],
          [call(fetchManifest, { manifestId: 'manifest.json' }), {}],
          [call(setWindowStartingCanvas, action)],
          [call(setWindowDefaultSearchQuery, action)],
        ])
        .call(fetchManifest, { manifestId: 'manifest.json' })
        .run();
    });
    it('does not call fetchManifest if the manifest is already available', () => {
      const action = {
        window: {
          id: 'x',
          manifestId: 'manifest.json',
        },
      };

      return expectSaga(fetchWindowManifest, action)
        .provide([
          [select(getManifests), { 'manifest.json': {} }],
          [call(setWindowStartingCanvas, action)],
          [call(setWindowDefaultSearchQuery, action)],
        ])
        .not.call(fetchManifest, { manifestId: 'manifest.json' })
        .run();
    });
    it('calls additional methods after ensuring we have a manifest', () => {
      const action = {
        window: {
          id: 'x',
          manifestId: 'manifest.json',
        },
      };

      return expectSaga(fetchWindowManifest, action)
        .provide([
          [select(getManifests), { 'manifest.json': {} }],
          [call(setWindowStartingCanvas, action)],
          [call(setWindowDefaultSearchQuery, action)],
        ])
        .call(setWindowStartingCanvas, action)
        .call(setWindowDefaultSearchQuery, action)
        .run();
    });
  });

  describe('setWindowStartingCanvas', () => {
    it('calls setCanvas if the canvas id was provided', () => {
      const action = {
        window: {
          canvasId: '1',
          id: 'x',
          manifestId: 'manifest.json',
        },
      };

      return expectSaga(fetchWindowManifest, action)
        .provide([
          [select(getManifests), { 'manifest.json': {} }],
          [call(setCanvas, 'x', '1'), { type: 'setCanvasThunk' }],
        ])
        .put({ type: 'setCanvasThunk' })
        .run();
    });

    it('calculates the starting canvas and calls setCanvas', () => {
      const action = {
        window: {
          id: 'x',
          manifestId: 'manifest.json',
        },
      };

      const manifest = Utils.parseManifest({ ...fixture, start: { id: 'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1' } });

      return expectSaga(fetchWindowManifest, action)
        .provide([
          [select(getManifests), { 'manifest.json': {} }],
          [select(getManifestoInstance, { manifestId: 'manifest.json' }), manifest],
          [call(setCanvas, 'x', 'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1'), { type: 'setCanvasThunk' }],
        ])
        .put({ type: 'setCanvasThunk' })
        .run();
    });
  });

  describe('setWindowDefaultSearchQuery', () => {
    it('does nothing if there was no default query', () => {
      const action = {
        window: {
          id: 'x',
          manifestId: 'manifest.json',
        },
      };

      return expectSaga(setWindowDefaultSearchQuery, action)
        .run().then(({ allEffects }) => allEffects.length === 0);
    });

    it('initiates a search', () => {
      const action = {
        window: {
          defaultSearchQuery: 'xyz',
          id: 'x',
          manifestId: 'manifest.json',
        },
      };

      return expectSaga(setWindowDefaultSearchQuery, action)
        .provide([
          [select(getManifestSearchService, { windowId: 'x' }), { id: 'http://search/' }],
          [select(getCompanionWindowIdsForPosition, { position: 'left', windowId: 'x' }), ['left']],
        ])
        .put({
          companionWindowId: 'left',
          query: 'xyz',
          searchId: 'http://search/?q=xyz',
          type: ActionTypes.REQUEST_SEARCH,
          windowId: 'x',
        })
        .run()
        .then(({ allEffects }) => allEffects.length === 1);
    });
  });
});
