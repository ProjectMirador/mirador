import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import createStore from './state/createStore';
import * as actions from './state/actions';
import './styles/index.scss';

const store = createStore();
const devConfig = {
  id: 'mirador',
  windows: [{
    loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
  },
  {
    loadedManifest: 'https://media.nga.gov/public/manifests/nga_highlights.json',
    thumbnailNavigationDisplayed: false,
  }],
  thumbnailNavigation: {
    displayedByDefault: true,
    height: 150,
  },
};

/**
 *
 * @param config
 */
const loadWindows = (config) => {
  config.windows.forEach((miradorWindow) => {
    let thumbnailNavigationDisplayed;
    if (miradorWindow.thumbnailNavigationDisplayed !== undefined) {
      ({ thumbnailNavigationDisplayed } = miradorWindow);
    } else {
      thumbnailNavigationDisplayed = devConfig.thumbnailNavigation.displayedByDefault;
    }
    store.dispatch(actions.fetchManifest(miradorWindow.loadedManifest));
    store.dispatch(actions.addWindow({
      manifestId: miradorWindow.loadedManifest, thumbnailNavigationDisplayed,
    }));
  });
};

const action = actions.setConfig(devConfig);
store.dispatch(action);
loadWindows(devConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(devConfig.id),
);
