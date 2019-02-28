import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fullscreen from 'react-full-screen';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import WorkspaceArea from '../containers/WorkspaceArea';
import '../styles/index.scss';
import ErrorDialog from '../containers/ErrorDialog';

/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
export class App extends Component {
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
      isFullscreenEnabled, setWorkspaceFullscreen, theme, translations,
    } = this.props;

    Object.keys(translations).forEach((lng) => {
      this.i18n.addResourceBundle(lng, 'translation', translations[lng], true, true);
    });

    return (
      <Fullscreen
        enabled={isFullscreenEnabled}
        onChange={setWorkspaceFullscreen}
      >
        <I18nextProvider i18n={this.i18n}>
          <MuiThemeProvider theme={createMuiTheme(theme)}>
            <WorkspaceArea />
            <ErrorDialog />
          </MuiThemeProvider>
        </I18nextProvider>
      </Fullscreen>
    );
  }
}

App.propTypes = {
  isFullscreenEnabled: PropTypes.bool,
  language: PropTypes.string.isRequired,
  setWorkspaceFullscreen: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  translations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

};

App.defaultProps = {
  isFullscreenEnabled: false,
};
