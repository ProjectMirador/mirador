import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PluginContext from './PluginContext';
import { connectPluginsToStore, createTargetToPluginMapping, addPluginsToCompanionWindowsRegistry } from './pluginMapping';

/**  */
export default function PluginProvider({ plugins = [], children = null }) {
  const [pluginMap, setPluginMap] = useState({});

  // connectPluginsToStore/addPluginsToCompanionWindowsRegistry are real side
  // effects so this can't be a useMemo. It must be an effect.
  useEffect(() => {
    const connectedPlugins = connectPluginsToStore(plugins);
    addPluginsToCompanionWindowsRegistry(connectedPlugins);
    // setPluginMap is capturing the side effects result into state
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPluginMap(createTargetToPluginMapping(connectedPlugins));
  }, [plugins]);

  return <PluginContext.Provider value={pluginMap}>{children}</PluginContext.Provider>;
}

PluginProvider.propTypes = {
  children: PropTypes.node,
  plugins: PropTypes.array,
};
