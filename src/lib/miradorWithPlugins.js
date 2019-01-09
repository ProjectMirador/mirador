import React, { Component, Fragment } from 'react';
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

      this.pluginParent = this.pluginParent.bind(this);
    }

    /**
     * pluginParent - access the plugin's "parent"
     */
    pluginParent() {
      return this.pluginParent;
    }

    /**
     * render - renders the wrapped component with the plugins.
     */
    render() {
      const { config } = this.props;
      const { plugins } = config;
      return (
        <Fragment>
          <WrappedComponent {...this.props} ref={(parent) => { this.pluginParent = parent; }} />
          { /* TODO: Refactor .name here in some way so we dont need to rely on it */}
          {componentPlugins(WrappedComponent.name, plugins)
            .map(component => React.createElement(
              connect(component.mapStateToProps, component.mapDispatchToProps)(component.component),
              { key: component.name, ...this.props, pluginParent: this.pluginParent },
            ))
          }
        </Fragment>
      );
    }
  }

  ConnectedComponent.propTypes = {
    config: PropTypes.instanceOf(Object).isRequired,
  };

  /**
   */
  const mapStateToProps = state => ({ config: state.config });

  return connect(mapStateToProps, null)(ConnectedComponent);
}
