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
});
