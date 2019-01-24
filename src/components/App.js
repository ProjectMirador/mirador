import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
    return (
      <div className={ns('app')}>
        <ConnectedWorkspace />
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
    manifests: state.manifests,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = { fetchManifest: actions.fetchManifest };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(App);
