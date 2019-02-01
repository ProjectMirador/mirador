import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import createStore from './state/createStore';
import * as actions from './state/actions';
import './styles/index.scss';
import { loadWindows } from './lib/initUtils';

const appLocalConfig = process.env.REACT_APP_LOCAL_MIRADOR_CONFIG;

const store = createStore();

let devConfigFile;
if (appLocalConfig) {
  devConfigFile = appLocalConfig;
} else {
  devConfigFile = './config/defaultAppConfig.json';
}
const devConfig = require(`${devConfigFile}`);

const action = actions.setConfig(devConfig);
store.dispatch(action);
loadWindows(devConfig, store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(devConfig.id),
);
