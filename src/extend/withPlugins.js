import React, { Component } from 'react';
import curry from 'lodash/curry';
import { connect } from 'react-redux';
import { pluginStore } from '.';

/** withPlugins should be the innermost HOC */
function _withPlugins(targetName, TargetComponent) { // eslint-disable-line no-underscore-dangle
  /** plugin wrapper hoc */
  class PluginHoc extends Component {
    /** render */
    render() {
      const plugin = pluginStore.getPlugins().find(p => p.target === targetName);

      if (plugin && plugin.mode === 'wrap') {
        const PluginComponent = connectPluginComponent(plugin);
        return <PluginComponent {...this.props} TargetComponent={TargetComponent} />;
      }
      if (plugin && plugin.mode === 'add') {
        const PluginComponent = connectPluginComponent(plugin);
        return <TargetComponent {...this.props} PluginComponent={PluginComponent} />;
      }
      return <TargetComponent {...this.props} />;
    }
  }

  PluginHoc.displayName = `WithPlugins(${targetName})`;
  return PluginHoc;
}

/** Connect plugin component to state */
function connectPluginComponent(plugin) {
  return connect(plugin.mapStateToProps, plugin.mapDispatchToProps)(plugin.component);
}

/** withPlugins('MyComponent')(MyComponent) */
export const withPlugins = curry(_withPlugins);
