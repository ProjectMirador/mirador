import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fullscreen from 'react-full-screen';
import { I18nextProvider } from 'react-i18next';
import { LiveAnnouncer } from 'react-aria-live';
import {
  ThemeProvider, StylesProvider, createMuiTheme, jssPreset, createGenerateClassName,
} from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import createI18nInstance from '../i18n';

/**
 * This component adds viewer-specific providers.
 * @prop {Object} manifests
 */
export class AppProviders extends Component {
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

  /** */
  render() {
    const {
      children, classPrefix, isFullscreenEnabled, setWorkspaceFullscreen, theme, translations,
    } = this.props;

    const generateClassName = createGenerateClassName({
      productionPrefix: classPrefix,
    });

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
            <ThemeProvider
              theme={createMuiTheme(theme)}
            >
              <StylesProvider
                jss={create({ plugins: [...jssPreset().plugins, rtl()] })}
                generateClassName={generateClassName}
              >
                {children}
              </StylesProvider>
            </ThemeProvider>
          </LiveAnnouncer>
        </I18nextProvider>
      </Fullscreen>
    );
  }
}

AppProviders.propTypes = {
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  isFullscreenEnabled: PropTypes.bool,
  language: PropTypes.string.isRequired,
  setWorkspaceFullscreen: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  translations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

AppProviders.defaultProps = {
  children: null,
  classPrefix: '',
  isFullscreenEnabled: false,
};
