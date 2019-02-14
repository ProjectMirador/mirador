import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Fullscreen from 'react-fullscreen-crossbrowser';
import WorkspaceControlPanel from './WorkspaceControlPanel';
import Workspace from '../containers/Workspace';
import WorkspaceAdd from '../containers/WorkspaceAdd';
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
      isFullscreenEnabled, setWorkspaceFullscreen, classes,
      isWorkspaceAddVisible, theme,
    } = this.props;

    return (
      <div className={classNames(classes.background, ns('app'))}>
        <MuiThemeProvider theme={createMuiTheme(theme)}>
          <Fullscreen
            enabled={isFullscreenEnabled}
            onChange={setWorkspaceFullscreen}
          >
            {
              isWorkspaceAddVisible
                ? <WorkspaceAdd />
                : <Workspace />
             }
          </Fullscreen>
          <WorkspaceControlPanel />
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isFullscreenEnabled: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  setWorkspaceFullscreen: PropTypes.func.isRequired,
  isWorkspaceAddVisible: PropTypes.bool,
};

App.defaultProps = {
  isFullscreenEnabled: false,
  isWorkspaceAddVisible: false,
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
