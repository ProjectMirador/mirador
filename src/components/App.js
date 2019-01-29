import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import WorkspaceControlPanel from './WorkspaceControlPanel';
import ConnectedWorkspace from './Workspace';
import ns from '../config/css-ns';

/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
class App extends Component {
  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    return (
      <div className={ns('app')}>
        <CssBaseline />
        <ConnectedWorkspace />
        <WorkspaceControlPanel />
      </div>
    );
  }
}

export default App;
