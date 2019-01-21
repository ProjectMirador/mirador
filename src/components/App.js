import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';
import WorkspaceControlPanel from './WorkspaceControlPanel';
import Workspace from './Workspace';
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
        <Workspace />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
