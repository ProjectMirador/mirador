import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { I18nextProvider } from 'react-i18next';
import WorkspaceControlPanel from './WorkspaceControlPanel';
import Workspace from '../containers/Workspace';
import WorkspaceAdd from '../containers/WorkspaceAdd';
import ns from '../config/css-ns';
import i18n from '../i18n';

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
      isWorkspaceAddVisible, isWorkspaceControlPanelVisible, theme, translations,
    } = this.props;

    Object.keys(translations).forEach((lng) => {
      i18n.addResourceBundle(lng, 'translation', translations[lng], true, true);
    });

    return (
      <div className={classNames(classes.background, ns('viewer'))}>
        <I18nextProvider i18n={i18n}>
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
            {
              isWorkspaceControlPanelVisible
                && <WorkspaceControlPanel />
            }
          </MuiThemeProvider>
        </I18nextProvider>
      </div>
    );
  }
}

App.propTypes = {
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  translations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isFullscreenEnabled: PropTypes.bool,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  setWorkspaceFullscreen: PropTypes.func.isRequired,
  isWorkspaceAddVisible: PropTypes.bool,
  isWorkspaceControlPanelVisible: PropTypes.bool.isRequired,
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
