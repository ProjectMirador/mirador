import ReactDOM from 'react-dom';
import MiradorViewer from '../../../src/lib/MiradorViewer';

jest.unmock('react-i18next');
jest.mock('react-dom');
jest.mock('isomorphic-unfetch', () => jest.fn(() => Promise.resolve({ json: () => ({}) })));

jest.mock('../../../src/state/selectors', () => ({
  getCanvasGrouping: () => [],
  getCompanionWindowIdsForPosition: () => ['cwid'],
  getManifestoInstance: () => {},
  getManifests: () => (
    { 'https://iiif.harvardartmuseums.org/manifests/object/299843': { isFetching: true } }
  ),
  getManifestSearchService: () => ({ id: 'http://example.com/search' }),
  getSearchForWindow: () => {},
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
        catalog: [
          { manifestId: 'http://media.nga.gov/public/manifests/nga_highlights.json', provider: 'National Gallery of Art' },
        ],
        id: 'mirador',
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

      const { windows, catalog } = instance.store.getState();
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

      expect(catalog.length).toBe(1);
      expect(catalog[0].manifestId).toBe('http://media.nga.gov/public/manifests/nga_highlights.json');
      expect(catalog[0].provider).toBe('National Gallery of Art');
    });
  });
});
