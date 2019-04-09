import React from 'react';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';

/** invisible area where background plugins can add to */
export const BackgroundPluginArea = ({ PluginComponents }) => (
  <div className={ns('background-plugin-area')} style={{ display: 'none' }}>
    { renderPlugins(PluginComponents) }
  </div>
);

BackgroundPluginArea.propTypes = {
  PluginComponents: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

BackgroundPluginArea.defaultProps = {
  PluginComponents: [],
};

/** render single plugin */
const renderPlugin = (PluginComponent, key) => <PluginComponent key={key} />;
/** render mulitple plugins */
const renderPlugins = PluginComponents => PluginComponents.map(renderPlugin);
