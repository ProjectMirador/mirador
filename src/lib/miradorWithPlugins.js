import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import componentPlugins from './componentPlugins';
/**
 * miradorWithPlugins - renders and returns a component with provided plugins
 *
 * @param  {type} WrappedComponent
 */
export default function miradorWithPlugins(WrappedComponent) {
  /**
   */
  class ConnectedComponent extends Component {
    /**
     * constructor -
     */
    constructor(props) {
      super(props);

      this.getPluginParent = this.getPluginParent.bind(this);
    }

    /**
     * pluginParent - access the plugin's "parent"
     */
    getPluginParent() {
      return this.pluginParent;
    }

    /**
     * render - renders the wrapped component with the plugins.
     */
    render() {
      const { config } = this.props;
      const { plugins } = config;
      return (
        <>
          <WrappedComponent {...this.props} ref={(parent) => { this.pluginParent = parent; }} />
          {componentPlugins(WrappedComponent.name, plugins)
            .map(component => React.createElement(
              connect(component.mapStateToProps, component.mapDispatchToProps)(component.component),
              { key: component.name, ...this.props, pluginParent: this.getPluginParent },
            ))
          }
        </>
      );
    }
  }

  const wrappedComponentName = WrappedComponent.name || 'Component';

  ConnectedComponent.displayName = `miradorWithPlugins(${wrappedComponentName})`;

  ConnectedComponent.propTypes = {
    config: PropTypes.instanceOf(Object).isRequired,
  };

  /**
   */
  const mapStateToProps = state => ({ config: state.config });


  const enhance = compose(
    connect(mapStateToProps),
    // further HOC go here
  );

  return enhance(ConnectedComponent);
}
