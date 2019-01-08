import React, { Component, Fragment } from 'react';
import componentPlugins from './componentPlugins';
/**
 * miradorWithPlugins - renders and returns a component with provided plugins
 *
 * @param  {type} WrappedComponent
 */
export default function miradorWithPlugins(WrappedComponent) {
  return class extends Component {
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
      return (
        <Fragment>
          <WrappedComponent {...this.props} ref={(parent) => { this.pluginParent = parent; }} />
          {componentPlugins(WrappedComponent.name).map(component => React.createElement(
            component.component,
            { key: component.name, ...this.props, pluginParent: this.pluginParent },
          ))}
        </Fragment>
      );
    }
  };
}
