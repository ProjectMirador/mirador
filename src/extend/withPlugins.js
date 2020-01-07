import React, { useContext } from 'react';
import curry from 'lodash/curry';
import isEmpty from 'lodash/isEmpty';
import PluginContext from './PluginContext';


/** withPlugins should be the innermost HOC */
function _withPlugins(targetName, TargetComponent) { // eslint-disable-line no-underscore-dangle
  /** */
  function PluginHoc(props, ref) {
    const pluginMap = useContext(PluginContext);

    const passDownProps = {
      ...props,
    };

    if (ref) passDownProps.ref = ref;

    if (isEmpty(pluginMap)) {
      return <TargetComponent {...passDownProps} />;
    }

    const plugins = pluginMap[targetName];

    if (isEmpty(plugins)) {
      return <TargetComponent {...passDownProps} />;
    }

    if (!isEmpty(plugins.wrap) && !isEmpty(plugins.add)) {
      const WrapPluginComponent = plugins.wrap[0].component;
      const AddPluginComponents = plugins.add.map(plugin => plugin.component);
      return (
        <WrapPluginComponent
          targetProps={passDownProps}
          {...passDownProps}
          PluginComponents={AddPluginComponents}
          TargetComponent={TargetComponent}
        />
      );
    }

    if (!isEmpty(plugins.wrap)) {
      const PluginComponent = plugins.wrap[0].component;
      return <PluginComponent targetProps={passDownProps} TargetComponent={TargetComponent} />;
    }

    if (!isEmpty(plugins.add)) {
      const PluginComponents = plugins.add.map(plugin => plugin.component);
      return <TargetComponent {...passDownProps} PluginComponents={PluginComponents} />;
    }
  }
  const whatever = React.forwardRef(PluginHoc);

  whatever.displayName = `WithPlugins(${targetName})`;
  return whatever;
}

/** withPlugins('MyComponent')(MyComponent) */
export const withPlugins = curry(_withPlugins);
