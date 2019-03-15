import ReactDOM from 'react-dom';
import { pluginStore } from '../../../src/extend';
import MiradorViewer from '../../../src/lib/MiradorViewer';

jest.unmock('react-i18next');
jest.mock('../../../src/extend');
jest.mock('react-dom');

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
  describe('process plugins', () => {
    it('should store plugins and set reducers to state', () => {
      /** */ const fooReducer = (state = 0) => state;
      /** */ const barReducer = (state = 0) => state;
      /** */ const bazReducer = (state = 0) => state;
      /** */ const plugins = [
        {
          reducers: {
            foo: fooReducer,
            bar: barReducer,
          },
        },
        {
          reducers: {
            baz: bazReducer,
          },
        },
      ];
      instance = new MiradorViewer({}, plugins);
      expect(pluginStore.storePlugins).toBeCalledWith(plugins);
      expect(instance.store.getState().foo).toBeDefined();
      expect(instance.store.getState().bar).toBeDefined();
      expect(instance.store.getState().baz).toBeDefined();
    });
  });
  describe('processConfig', () => {
    it('transforms config values to actions to dispatch to store', () => {
      instance = new MiradorViewer({
        id: 'mirador',
        windows: [
          {
            loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
            canvasIndex: 2,
          },
          {
            loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
            thumbnailNavigationPosition: 'off',
            view: 'book',
          },
        ],
        manifests: {
          'http://media.nga.gov/public/manifests/nga_highlights.json': { provider: 'National Gallery of Art' },
        },
      });

      const { windows, manifests } = instance.store.getState();
      const windowIds = Object.keys(windows);
      expect(Object.keys(windowIds).length).toBe(2);
      expect(windows[windowIds[0]].canvasIndex).toBe(2);
      expect(windows[windowIds[1]].canvasIndex).toBe(0);
      expect(windows[windowIds[0]].thumbnailNavigationPosition).toBe('far-bottom');
      expect(windows[windowIds[1]].thumbnailNavigationPosition).toBe('off');
      expect(windows[windowIds[0]].view).toBe('single');
      expect(windows[windowIds[1]].view).toBe('book');

      const manifestIds = Object.keys(manifests);
      expect(Object.keys(manifestIds).length).toBe(2);
      expect(manifests['http://media.nga.gov/public/manifests/nga_highlights.json'].provider).toBe('National Gallery of Art');
    });
  });
});
