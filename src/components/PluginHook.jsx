import { forwardRef, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { usePlugins } from '../extend/usePlugins';

/** Renders plugins */
export const PluginHook = forwardRef(({ classes = {}, targetName, ...otherProps }, ref) => {
  const { PluginComponents } = usePlugins(targetName);

  return PluginComponents
    ? PluginComponents.map((PluginComponent, index) =>
        isValidElement(PluginComponent) ? (
          cloneElement(PluginComponent, {
            key: PluginComponent.key ?? `plugin-${index}`,
            ...otherProps,
            ref,
          })
        ) : (
          <PluginComponent key={PluginComponent.name || `plugin-${index}`} ref={ref} {...otherProps} />
        ),
      )
    : null;
});

PluginHook.displayName = 'PluginHook';

PluginHook.propTypes = {
  // eslint-disable-next-line react/require-default-props
  classes: PropTypes.object,
  targetName: PropTypes.string.isRequired,
};
