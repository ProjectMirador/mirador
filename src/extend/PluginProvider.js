import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PluginContext from './PluginContext';
import {
  filterValidPlugins,
  addPluginReducersToStore,
  connectPluginsToStore,
  createTargetToPluginMapping,
} from './pluginPreprocessing';

/**  */
export default function PluginProvider(props) {
  const {
    store, plugins, createRootReducer, children,
  } = props;
  const [pluginMap, setPluginMap] = useState({});

  useEffect(() => {
    const validPlugins = filterValidPlugins(plugins);
    const connectedPlugins = connectPluginsToStore(validPlugins);
    createRootReducer && addPluginReducersToStore(store, createRootReducer, validPlugins);
    setPluginMap(createTargetToPluginMapping(connectedPlugins));
  }, []);

  return (
    <PluginContext.Provider value={pluginMap}>
      { children }
    </PluginContext.Provider>
  );
}

PluginProvider.propTypes = {
  children: PropTypes.node,
  createRootReducer: PropTypes.func,
  plugins: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  store: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

PluginProvider.defaultProps = {
  children: null,
  createRootReducer: null,
  plugins: [],
  store: null,
};
