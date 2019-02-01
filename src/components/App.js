import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
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
    const {
      workspace, setWorkspaceFullscreen, config, classes,
    } = this.props;
    const theme = createMuiTheme({
      palette: {
        type: config.theme,
      },
      typography: {
        useNextVariants: true,
      },
    });

    return (
      <div className={classNames(classes.background, ns('app'))}>
        <MuiThemeProvider theme={theme}>
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
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  setWorkspaceFullscreen: PropTypes.func,
};

App.defaultProps = {
  workspace: {},
  setWorkspaceFullscreen: () => {},
};

/**
 Material UI style overrides
 @private
 */
const styles = theme => ({
  background: {
    background: theme.palette.background.default,
  },
});

export default withStyles(styles)(App);
