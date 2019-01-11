import ReactDOM from 'react-dom';
import MiradorViewer from '../../../src/lib/MiradorViewer';

describe('MiradorViewer', () => {
  let instance;
  let previousMirador;
  beforeAll(() => {
    ReactDOM.render = jest.fn();
    instance = new MiradorViewer({});
    previousMirador = window;
  });
  afterAll(() => {
    window.Mirador = previousMirador;
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
  describe('processPlugins', () => {
    it('combines actionCreators and reducers', () => {
      const fooPlugin = {
        actions: {
          fooAction: () => {},
        },
        reducers: {
          fooReducer: null,
        },
      };
      window.Mirador = {
        plugins: {
          fooPlugin,
        },
      };
      instance = new MiradorViewer({
        plugins: ['fooPlugin'],
      });
      expect(instance.actions.fooAction).toBeDefined();
      expect(instance.store.pluginReducers).toBeDefined();
    });
  });
  describe('processWindows', () => {
    it('fetches manifests and adds windows', () => {
      instance = new MiradorViewer({
        miradorWindows: [
          {
            loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
          },
          {
            loadedManifest: 'http://media.nga.gov/public/manifests/nga_highlights.json',
          },
        ],
      });
      expect(instance.store.getState().manifests).toEqual(expect.objectContaining({
        'https://iiif.harvardartmuseums.org/manifests/object/299843': expect.anything(),
        'http://media.nga.gov/public/manifests/nga_highlights.json': expect.anything(),
      }));
      expect(instance.store.getState().windows.length).toEqual(2);
    });
  });
});
