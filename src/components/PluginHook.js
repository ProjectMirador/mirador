import React from 'react';

/** Renders plugins */
export const PluginHook = (props) => {
  const { PluginComponents } = props; // eslint-disable-line react/prop-types
  return PluginComponents ? (
    PluginComponents.map((PluginComponent, index) => (
      <PluginComponent {...props} key={index} /> // eslint-disable-line react/no-array-index-key
    ))
  ) : null;
};
