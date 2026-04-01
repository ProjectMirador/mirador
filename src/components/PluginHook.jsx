/* eslint-disable react/no-array-index-key */
import { forwardRef, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { usePlugins } from '../extend/usePlugins';

/** Renders plugins */
export const PluginHook = forwardRef(({ classes = {}, targetName, ...otherProps }, ref) => {
  const { PluginComponents } = usePlugins(targetName);

  /* eslint-disable react/no-array-index-key */
  return PluginComponents
    ? PluginComponents.map((PluginComponent, index) =>
        isValidElement(PluginComponent) ? (
          cloneElement(PluginComponent, { ...otherProps, ref })
        ) : (
          <PluginComponent ref={ref} {...otherProps} key={index} />
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
