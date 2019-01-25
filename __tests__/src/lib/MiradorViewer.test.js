import ReactDOM from 'react-dom';
import MiradorViewer from '../../../src/lib/MiradorViewer';

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
  describe('processConfig', () => {
    it('transforms config values to actions to dispatch to store', () => {
      instance = new MiradorViewer({
        id: 'mirador',
        windows: [{
          loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
        },
        {
          loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
          thumbnailNavigationDisplayed: false,
        },
        ],
      });

      const { windows } = instance.store.getState();
      const windowIds = Object.keys(windows);
      expect(Object.keys(windowIds).length).toBe(2);
      expect(windows[windowIds[0]].thumbnailNavigationDisplayed).toBe(true);
      expect(windows[windowIds[1]].thumbnailNavigationDisplayed).toBe(false);
    });
  });
});
