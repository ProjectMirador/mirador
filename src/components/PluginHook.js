import { forwardRef, isValidElement, cloneElement } from 'react';
import { usePlugins } from '../extend/usePlugins';

/** Renders plugins */
export const PluginHook = forwardRef(({ classes, targetName, ...otherProps }, ref) => {
  const { PluginComponents } = usePlugins(targetName);

  return PluginComponents ? (
    PluginComponents.map((PluginComponent, index) => ( // eslint-disable-line react/prop-types
      isValidElement(PluginComponent)
        ? cloneElement(PluginComponent, { ...otherProps, ref })
        : (
          <PluginComponent
            ref={ref}
            {...otherProps}
            key={index} // eslint-disable-line react/no-array-index-key
          />
        )
    ))
  ) : null;
});
