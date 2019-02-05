import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fullscreen from 'react-fullscreen-crossbrowser';
import WorkspaceControlPanel from './WorkspaceControlPanel';
import Workspace from '../containers/Workspace';
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
    const { workspace, setWorkspaceFullscreen } = this.props;
    return (
      <div className={ns('app')}>
        <CssBaseline />
        <Fullscreen
          enabled={workspace.isFullscreenEnabled}
          onChange={isFullscreenEnabled => setWorkspaceFullscreen(isFullscreenEnabled)}
        >
          <Workspace />
        </Fullscreen>
        <WorkspaceControlPanel />
      </div>
    );
  }
}

App.propTypes = {
  workspace: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  setWorkspaceFullscreen: PropTypes.func,
};

App.defaultProps = {
  workspace: {},
  setWorkspaceFullscreen: () => {},
};

export default App;
