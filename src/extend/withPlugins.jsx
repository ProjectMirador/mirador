import { forwardRef, useContext } from 'react';
import PluginContext from './PluginContext';

/** withPlugins should be the innermost HOC */
function _withPlugins(targetName, TargetComponent) {
  /** */
  function PluginHoc(props, ref) {
    const pluginMap = useContext(PluginContext);

    const passDownProps = {
      ...props,
      ...(ref ? { ref } : {}),
    };

    const plugins = (pluginMap || {})[targetName];

    if (!plugins || Object.keys(plugins).length === 0 || !plugins.wrap || plugins.wrap.length === 0) {
      return <TargetComponent {...passDownProps} />;
    }

    /** */
    const pluginWrapper = (children, plugin) => {
      const WrapPluginComponent = plugin.component;

      return (
        <WrapPluginComponent targetProps={passDownProps} {...passDownProps} TargetComponent={TargetComponent}>
          {children}
        </WrapPluginComponent>
      );
    };

    return plugins.wrap
      .slice()
      .reverse()
      .reduce(pluginWrapper, <TargetComponent {...passDownProps} />);
  }
  const whatever = forwardRef(PluginHoc);

  whatever.displayName = `WithPlugins(${targetName})`;
  return whatever;
}

/** withPlugins('MyComponent')(MyComponent) */
export const withPlugins = (targetName, TargetComponent) =>
  TargetComponent === undefined ? (component) => _withPlugins(targetName, component) : _withPlugins(targetName, TargetComponent);
