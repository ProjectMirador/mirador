import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PluginContext from './PluginContext';
import { connectPluginsToStore, createTargetToPluginMapping, addPluginsToCompanionWindowsRegistry } from './pluginMapping';

/**  */
export default function PluginProvider({ plugins = [], children = null }) {
  const [pluginMap, setPluginMap] = useState({});

  useEffect(() => {
    const connectedPlugins = connectPluginsToStore(plugins);
    addPluginsToCompanionWindowsRegistry(connectedPlugins);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPluginMap(createTargetToPluginMapping(connectedPlugins));
  }, [plugins]);

  return <PluginContext.Provider value={pluginMap}>{children}</PluginContext.Provider>;
}

PluginProvider.propTypes = {
  children: PropTypes.node,
  plugins: PropTypes.array,
};
