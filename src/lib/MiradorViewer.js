import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import App from '../containers/App';
import createStore from '../state/createStore';
import * as actions from '../state/actions';
import withMiradorAPI from './withMiradorAPI';
import settings from '../config/settings';

/**
 * miradorDefaultImplementation.
 * @param config
 * @returns {{store, actions: {}}}
 */
export default function miradorDefaultImplementation(config) {
  const store = createStore();
  const mixinConfig = deepmerge(settings, config);
  const MiradorViewer = withMiradorAPI(store, mixinConfig)(App);
  const element = (
    <Provider store={store}>
      <MiradorViewer />
    </Provider>
  );
  ReactDOM.render(element, document.getElementById(mixinConfig.id));
  return { actions, store };
}
