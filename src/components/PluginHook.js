import { forwardRef, isValidElement, cloneElement } from 'react';
import { useTranslation } from 'react-i18next';

/** Renders plugins */
export const PluginHook = forwardRef((props, ref) => {
  const { PluginComponents } = props; // eslint-disable-line react/prop-types
  const { classes, ...otherProps } = props; // eslint-disable-line react/prop-types
  const {t} = useTranslation()
  return PluginComponents ? (
    PluginComponents.map((PluginComponent, index) => ( // eslint-disable-line react/prop-types
      isValidElement(PluginComponent)
        ? cloneElement(PluginComponent, {t,  ...otherProps, ref })
        : (
          <PluginComponent
            ref={ref}
            t={t}
            {...otherProps}
            key={index} // eslint-disable-line react/no-array-index-key
          />
        )
    ))
  ) : null;
});

PluginHook.displayName = 'PluginHook';
