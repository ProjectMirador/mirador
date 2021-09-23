import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import MiradorViewer from '../../../src/lib/MiradorViewer';

jest.unmock('react-i18next');
jest.mock('react-dom');
jest.mock('isomorphic-unfetch', () => jest.fn(() => Promise.resolve({ json: () => ({}) })));

describe('MiradorViewer', () => {
  let instance;
  beforeAll(() => {
    ReactDOM.render = jest.fn();
    ReactDOM.unmountComponentAtNode = jest.fn();
    instance = new MiradorViewer({ id: 'mirador' });
  });
  describe('constructor', () => {
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
      },
      {
        plugins: [{
          config: {
            foo: 'bar',
          },
          mode: 'add',
          target: 'WindowTopBarPluginArea',
        }],
      });

      const { windows, catalog, config } = instance.store.getState();
      const windowIds = Object.keys(windows);
      expect(Object.keys(windowIds).length).toBe(2);
      expect(windows[windowIds[0]].canvasId).toBe('https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174892');
      expect(windows[windowIds[1]].canvasId).toBe(undefined);
      expect(windows[windowIds[0]].thumbnailNavigationPosition).toBe('far-bottom');
      expect(windows[windowIds[1]].thumbnailNavigationPosition).toBe(undefined);
      expect(windows[windowIds[0]].view).toBe(undefined);
      expect(windows[windowIds[1]].view).toBe('book');

      expect(catalog.length).toBe(2);
      expect(catalog[0].manifestId).toBe('https://iiif.harvardartmuseums.org/manifests/object/299843');
      expect(catalog[1].manifestId).toBe('http://media.nga.gov/public/manifests/nga_highlights.json');
      expect(catalog[1].provider).toBe('National Gallery of Art');
      expect(config.foo).toBe('bar');
    });
    it('merges translation configs from multiple plugins', () => {
      instance = new MiradorViewer({
        id: 'mirador',
      },
      {
        plugins: [
          {
            config: {
              translations: {
                en: {
                  foo: 'bar',
                },
              },
            },
            mode: 'add',
            target: 'WindowTopBarPluginArea',
          },
          {
            config: {
              translations: {
                en: {
                  bat: 'bar',
                },
              },
            },
            mode: 'wrap',
            target: 'Window',
          },
        ],
      });

      const { config } = instance.store.getState();

      expect(config.translations.en).toEqual(expect.objectContaining({
        bat: 'bar',
        foo: 'bar',
      }));
    });
  });

  describe('render', () => {
    it('passes props through to the App component', () => {
      const rendered = shallow(instance.render({ some: 'prop' }));
      expect(rendered.find('App').length).toBe(1);
      expect(rendered.find('App').prop('some')).toBe('prop');
    });
  });

  describe('unmount', () => {
    it('unmounts via ReactDOM', () => {
      instance.unmount();
      expect(ReactDOM.unmountComponentAtNode).toHaveBeenCalled();
    });
  });
});
