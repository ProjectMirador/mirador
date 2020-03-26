import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fullscreen from 'react-full-screen';
import { I18nextProvider } from 'react-i18next';
import { LiveAnnouncer } from 'react-aria-live';
import createI18nInstance from '../i18n';
import AuthenticationSender from '../containers/AuthenticationSender';
import AccessTokenSender from '../containers/AccessTokenSender';

const WorkspaceArea = lazy(() => import('../containers/WorkspaceArea'));

/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
export class App extends Component {
  /** */
  constructor(props) {
    super(props);

    this.i18n = createI18nInstance();
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
          <LiveAnnouncer>
            <MuiThemeProvider theme={createMuiTheme(theme)}>
              <AuthenticationSender />
              <AccessTokenSender />
              <Suspense
                fallback={<div />}
              >
                <WorkspaceArea />
              </Suspense>
            </MuiThemeProvider>
          </LiveAnnouncer>
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
