import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { I18nextProvider } from 'react-i18next';
import WorkspaceControlPanel from '../containers/WorkspaceControlPanel';
import Workspace from '../containers/Workspace';
import WorkspaceAdd from '../containers/WorkspaceAdd';
import ns from '../config/css-ns';
import i18n from '../i18n';

/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
class App extends Component {
  /** */
  constructor(props) {
    super(props);

    this.i18n = i18n;
  }

  /**
   * Set i18n language on component mount
   */
  componentDidMount() {
    const { language } = this.props;

    this.i18n.changeLanguage(language);
  }

  /**
   * Update the i18n language if it is changed
   */
  componentDidUpdate(prevProps) {
    const { language } = this.props;

    if (prevProps.language !== language) {
      this.i18n.changeLanguage(language);
    }
  }

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
      this.i18n.addResourceBundle(lng, 'translation', translations[lng], true, true);
    });

    return (
      <div className={classNames(classes.background, ns('app'))}>
        <I18nextProvider i18n={this.i18n}>
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
  language: PropTypes.string.isRequired,
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


export default App;
