import React from 'react';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';

/** invisible area where background plugins can add to */
export const BackgroundPluginArea = props => (
  <div className={ns('background-plugin-area')} style={{ display: 'none' }}>
    <PluginHook {...props} />
  </div>
);

BackgroundPluginArea.propTypes = {
  PluginComponents: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

BackgroundPluginArea.defaultProps = {
  PluginComponents: [],
};
