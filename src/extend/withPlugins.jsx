import { forwardRef, useContext } from 'react';
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
      ...(ref ? { ref } : {}),
    };

    const plugins = (pluginMap || {})[targetName];

    if (isEmpty(plugins) || isEmpty(plugins.wrap)) {
      return <TargetComponent {...passDownProps} />;
    }

    /** */
    const pluginWrapper = (children, plugin) => {
      const WrapPluginComponent = plugin.component;

      return (
        <WrapPluginComponent
          targetProps={passDownProps}
          {...passDownProps}
          TargetComponent={TargetComponent}
        >
          {children}
        </WrapPluginComponent>
      );
    };

    return plugins.wrap.slice().reverse()
      .reduce(pluginWrapper, <TargetComponent {...passDownProps} />);
  }
  const whatever = forwardRef(PluginHoc);

  whatever.displayName = `WithPlugins(${targetName})`;
  return whatever;
}

/** withPlugins('MyComponent')(MyComponent) */
export const withPlugins = curry(_withPlugins);
