import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import PluginProvider from '../extend/PluginProvider';
import createRootReducer from '../state/reducers/rootReducer';
import AppProviders from '../containers/AppProviders';
import AuthenticationSender from '../containers/AuthenticationSender';
import AccessTokenSender from '../containers/AccessTokenSender';

const WorkspaceArea = lazy(() => import('../containers/WorkspaceArea'));

/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
export class App extends Component {
  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { plugins } = this.props;

    return (
      <PluginProvider plugins={plugins} createRootReducer={createRootReducer}>
        <AppProviders>
          <AuthenticationSender />
          <AccessTokenSender />
          <Suspense
            fallback={<div />}
          >
            <WorkspaceArea />
          </Suspense>
        </AppProviders>
      </PluginProvider>
    );
  }
}

App.propTypes = {
  plugins: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

App.defaultProps = {
  plugins: [],
};
