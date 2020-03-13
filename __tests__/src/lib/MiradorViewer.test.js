import ReactDOM from 'react-dom';
import MiradorViewer from '../../../src/lib/MiradorViewer';

jest.unmock('react-i18next');
jest.mock('react-dom');
jest.mock('isomorphic-unfetch', () => jest.fn(() => Promise.resolve({ json: () => ({}) })));

jest.mock('../../../src/state/selectors', () => ({
  getCompanionWindowIdsForPosition: () => ['cwid'],
  getManifestSearchService: () => ({ id: 'http://example.com/search' }),
}));

describe('MiradorViewer', () => {
  let instance;
  beforeAll(() => {
    ReactDOM.render = jest.fn();
    instance = new MiradorViewer({});
  });
  describe('constructor', () => {
    it('returns viewer actions', () => {
      expect(instance.actions.addWindow).toBeDefined();
    });
    it('returns viewer store', () => {
      expect(instance.store.dispatch).toBeDefined();
    });
    it('renders via ReactDOM', () => {
      expect(ReactDOM.render).toHaveBeenCalled();
    });
  });
  describe('processConfig', () => {
    it('transforms config values to actions to dispatch to store', () => {
      instance = new MiradorViewer({
        id: 'mirador',
        manifests: {
          'http://media.nga.gov/public/manifests/nga_highlights.json': { provider: 'National Gallery of Art' },
        },
        windows: [
          {
            canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174892',
            loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
            thumbnailNavigationPosition: 'far-bottom',
          },
          {
            loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
            view: 'book',
          },
        ],
      });

      const { windows, manifests } = instance.store.getState();
      const windowIds = Object.keys(windows);
      expect(Object.keys(windowIds).length).toBe(2);
      expect(windows[windowIds[0]].canvasId).toBe('https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174892');
      expect(windows[windowIds[1]].canvasId).toBe(undefined);
      expect(windows[windowIds[0]].layoutOrder).toBe(0);
      expect(windows[windowIds[1]].layoutOrder).toBe(1);
      expect(windows[windowIds[0]].thumbnailNavigationPosition).toBe('far-bottom');
      expect(windows[windowIds[1]].thumbnailNavigationPosition).toBe('off');
      expect(windows[windowIds[0]].view).toBe(undefined);
      expect(windows[windowIds[1]].view).toBe('book');

      const manifestIds = Object.keys(manifests);
      expect(Object.keys(manifestIds).length).toBe(2);
      expect(manifests['http://media.nga.gov/public/manifests/nga_highlights.json'].provider).toBe('National Gallery of Art');
    });

    /** */
    function flushPromises() {
      return new Promise(resolve => setImmediate(resolve));
    }

    it('dispatches pre-configured searches', async () => {
      instance = new MiradorViewer({
        id: 'mirador',
        windows: [
          {
            defaultSearchQuery: 'NSF',
            manifestId: 'https://purl.stanford.edu/fg165hz3589/iiif/manifest',
          },
        ],
      });

      await flushPromises();

      const { searches, windows } = instance.store.getState();
      const windowIds = Object.keys(windows);
      const searchWindowIds = Object.keys(searches);
      expect(Object.keys(searchWindowIds).length).toBe(1);
      expect(searches[windowIds[0]].cwid.query).toBe('NSF');
    });
  });
});
