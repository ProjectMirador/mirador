import { store, actions } from '../store';
import createRootReducer from '../reducers/index';

/**
 * Process Plugins
 */
export default function processPlugins(availablePlugins, enabledPlugins = []) {
  const actionCreators = [];
  const reducers = [];

  enabledPlugins.forEach((pluginName) => {
    const plugin = availablePlugins[pluginName];

    // Add Actions
    if (plugin.actions) {
      Object.keys(plugin.actions)
        .forEach(actionName => actionCreators.push({
          name: actionName,
          action: plugin.actions[actionName],
        }));
    }
    // Add Reducers
    if (plugin.reducers) {
      Object.keys(plugin.reducers)
        .forEach(reducerName => reducers.push({
          name: reducerName,
          reducer: plugin.reducers[reducerName],
        }));
    }
  });

  actionCreators.forEach((action) => {
    actions[action.name] = action.action;
  });
  reducers.forEach((reducer) => {
    store.pluginReducers[reducer.name] = reducer.reducer;
  });

  // ReplaceReducer recomposes the root reducer
  // with the new named reducer functions,
  // causing them to appear in the state.
  // https://redux.js.org/api/store#a-id-replacereducer-a-replacereducernextreducer-replacereducer
  store.replaceReducer(createRootReducer(store.pluginReducers));
}
