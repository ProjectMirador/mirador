import React, { Component, lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import PropTypes from 'prop-types';
import PluginProvider from '../extend/PluginProvider';
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
    const { dragDropManager, plugins } = this.props;

    return (
      <PluginProvider plugins={plugins}>
        <AppProviders dragDropManager={dragDropManager}>
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
  dragDropManager: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  plugins: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

App.defaultProps = {
  dragDropManager: undefined,
  plugins: [],
};

export default hot(App);
