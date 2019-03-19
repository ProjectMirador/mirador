import React, { Component } from 'react';
import curry from 'lodash/curry';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { pluginStore } from '.';

/** withPlugins should be the innermost HOC */
function _withPlugins(targetName, TargetComponent) { // eslint-disable-line no-underscore-dangle
  /** plugin wrapper hoc */
  class PluginHoc extends Component {
    /** render */
    render() { // eslint-disable-line consistent-return
      const plugins = pluginStore.getPlugins(targetName);

      if (isEmpty(plugins)) {
        return <TargetComponent {...this.props} />;
      }

      if (!isEmpty(plugins.delete)) {
        return null;
      }

      if (!isEmpty(plugins.replace)) {
        const ReplacePluginComponent = connectPluginComponent(plugins.replace[0]);
        return <ReplacePluginComponent {...this.props} />;
      }

      if (!isEmpty(plugins.wrap) && !isEmpty(plugins.add)) {
        const AddPluginComponents = plugins.add.map(plugin => connectPluginComponent(plugin));
        /** we want to pass an react constructor to WrapPluginComponent
            rather then a react element */
        const TargetComponentWithAddPlugins = props => (
          <TargetComponent {...props} PluginComponents={AddPluginComponents} />
        );
        const WrapPluginComponent = connectPluginComponent(plugins.wrap[0]);
        return (
          <WrapPluginComponent {...this.props} TargetComponent={TargetComponentWithAddPlugins} />
        );
      }

      if (!isEmpty(plugins.wrap)) {
        const WrapPluginComponent = connectPluginComponent(plugins.wrap[0]);
        return <WrapPluginComponent {...this.props} TargetComponent={TargetComponent} />;
      }

      if (!isEmpty(plugins.add)) {
        const AddPluginComponents = plugins.add.map(plugin => connectPluginComponent(plugin));
        return <TargetComponent {...this.props} PluginComponents={AddPluginComponents} />;
      }
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
