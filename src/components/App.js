import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { actions } from '../store';
import WorkspaceControlPanel from './WorkspaceControlPanel';
import ConnectedWorkspace from './Workspace';
import ns from '../config/css-ns';

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
    const { workspace, fullscreenWorkspace } = this.props;
    return (
      <div className={ns('app')}>
        <CssBaseline />
        <Fullscreen
          enabled={workspace.fullscreen}
          onChange={isFullscreenEnabled => fullscreenWorkspace(isFullscreenEnabled)}
        >
          <ConnectedWorkspace />
        </Fullscreen>
        <WorkspaceControlPanel />
      </div>
    );
  }
}

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    workspace: state.workspace,
    manifests: state.manifests,
  }
);

App.propTypes = {
  workspace: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  fullscreenWorkspace: PropTypes.func,
};

App.defaultProps = {
  workspace: {},
  fullscreenWorkspace: () => {},
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  fetchManifest: actions.fetchManifest,
  fullscreenWorkspace: actions.fullscreenWorkspace,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(App);
