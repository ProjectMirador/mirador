import init from './init';
import * as actions from './state/actions';
import * as selectors from './state/selectors';
import PluginListItem from './components/PluginListItem';

export * from './state/reducers';

const exports = {
  actions,
  components: {
    PluginListItem,
  },
  selectors,
  viewer: init,
};

export default exports;
