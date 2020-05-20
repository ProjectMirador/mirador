import { catalogReducer } from '../../../src/state/reducers/catalog';
import ActionTypes from '../../../src/state/actions/action-types';

describe('catalog reducer', () => {
  describe('ADD_MANIFEST', () => {
    it('adds new manifests to the state', () => {
      expect(catalogReducer([], {
        manifestId: '1',
        type: ActionTypes.ADD_RESOURCE,
      })).toEqual([
        { manifestId: '1' },
      ]);
    });
    it('adds new manifests to the top of state', () => {
      expect(catalogReducer([{ manifestId: '2' }], {
        manifestId: '1',
        type: ActionTypes.ADD_RESOURCE,
      })).toEqual([
        { manifestId: '1' },
        { manifestId: '2' },
      ]);
    });
    it('deduplicate manifests', () => {
      expect(catalogReducer([{ manifestId: '1' }], {
        manifestId: '1',
        type: ActionTypes.ADD_RESOURCE,
      })).toEqual([
        { manifestId: '1' },
      ]);
    });
  });

  describe('REQUEST_MANIFEST', () => {
    it('adds new manifests to the state', () => {
      expect(catalogReducer([], {
        manifestId: '1',
        type: ActionTypes.REQUEST_MANIFEST,
      })).toEqual([
        { manifestId: '1' },
      ]);
    });
    it('adds new manifests to the top of state', () => {
      expect(catalogReducer([{ manifestId: '2' }], {
        manifestId: '1',
        type: ActionTypes.REQUEST_MANIFEST,
      })).toEqual([
        { manifestId: '1' },
        { manifestId: '2' },
      ]);
    });
    it('deduplicate manifests', () => {
      expect(catalogReducer([{ manifestId: '1' }], {
        manifestId: '1',
        type: ActionTypes.REQUEST_MANIFEST,
      })).toEqual([
        { manifestId: '1' },
      ]);
    });
  });

  it('should handle REMOVE_RESOURCE', () => {
    expect(catalogReducer([{ manifestId: '1' }], {
      manifestId: '1',
      type: ActionTypes.REMOVE_RESOURCE,
    })).toEqual([]);
  });

  it('should handle IMPORT_MIRADOR_STATE', () => {
    expect(catalogReducer([], {
      state: { catalog: [{ manifestId: '1' }] },
      type: ActionTypes.IMPORT_MIRADOR_STATE,
    })).toEqual([
      { manifestId: '1' },
    ]);
  });

  it('should handle IMPORT_CONFIG', () => {
    expect(catalogReducer([], {
      config: { catalog: [{ manifestId: '1' }] },
      type: ActionTypes.IMPORT_CONFIG,
    })).toEqual([
      { manifestId: '1' },
    ]);
  });
});
