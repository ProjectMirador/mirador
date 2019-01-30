import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
    const { workspace, setWorkspaceFullscreen, config } = this.props;
    const theme = createMuiTheme({
      palette: {
        type: config.theme,
      },
      typography: {
        useNextVariants: true,
      },
    });

    return (
      <div className={ns('app')}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Fullscreen
            enabled={workspace.isFullscreenEnabled}
            onChange={isFullscreenEnabled => setWorkspaceFullscreen(isFullscreenEnabled)}
          >
            <Workspace />
          </Fullscreen>
          <WorkspaceControlPanel />
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  workspace: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  setWorkspaceFullscreen: PropTypes.func,
};

App.defaultProps = {
  workspace: {},
  setWorkspaceFullscreen: () => {},
};

export default App;
