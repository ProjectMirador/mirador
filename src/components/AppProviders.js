import { Component } from 'react';
import PropTypes from 'prop-types';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { I18nextProvider } from 'react-i18next';
import {
  ThemeProvider, StyledEngineProvider, createTheme,
} from '@mui/material/styles';
import { DndContext, DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createI18nInstance from '../i18n';
import FullScreenContext from '../contexts/FullScreenContext';
import LocaleContext from '../contexts/LocaleContext';

/**
 * Allow applications to opt-out of (or provide their own) drag and drop context
 */
const MaybeDndProvider = (props) => {
  const { dndManager, children } = props;
  if (dndManager === false) {
    return children;
  }

  if (dndManager === undefined) {
    return (
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        {children}
      </DndProvider>
    );
  }

  return (
    <DndContext.Provider value={dndManager}>
      {children}
    </DndContext.Provider>
  );
};

MaybeDndProvider.propTypes = {
  children: PropTypes.node.isRequired,
  dndManager: PropTypes.oneOf([
    undefined,
    false,
    PropTypes.object, // eslint-disable-line react/forbid-prop-types
  ]).isRequired,
};

/**
 * Shim to inject the full screen handle into a context
 */
const FullScreenShim = ({ children }) => {
  const handle = useFullScreenHandle();

  return (
    <FullScreen handle={handle}>
      <FullScreenContext.Provider value={handle}>
        {children}
      </FullScreenContext.Provider>
    </FullScreen>
  );
};

FullScreenShim.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * This component adds viewer-specific providers.
 * @prop {Object} manifests
 */
export class AppProviders extends Component {
  /** */
  constructor(props) {
    super(props);

    // Set i18n language
    this.i18n = createI18nInstance({ lng: props.language });
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
      children,
      language,
      theme, translations,
      dndManager,
    } = this.props;

    /**
     * Create rtl emotion cache
     */
    const cacheRtl = createCache({
      key: 'muirtl',
      stylisPlugins: [prefixer, rtlPlugin],
    });

    /**
     * Create default emotion cache
     */
    const cacheDefault = createCache({
      key: 'mui',
    });

    Object.keys(translations).forEach((lng) => {
      this.i18n.addResourceBundle(lng, 'translation', translations[lng], true, true);
    });

    return (
      <FullScreenShim>
        <I18nextProvider i18n={this.i18n}>
          <StyledEngineProvider injectFirst>
            <LocaleContext.Provider value={language}>
              <CacheProvider value={theme.direction === 'rtl' ? cacheRtl : cacheDefault}>
                <ThemeProvider theme={createTheme((theme))}>
                  <MaybeDndProvider dndManager={dndManager}>
                    {children}
                  </MaybeDndProvider>
                </ThemeProvider>
              </CacheProvider>
            </LocaleContext.Provider>
          </StyledEngineProvider>
        </I18nextProvider>
      </FullScreenShim>
    );
  }
}

AppProviders.propTypes = {
  children: PropTypes.node,
  dndManager: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  language: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  translations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

AppProviders.defaultProps = {
  children: null,
  dndManager: undefined,
};
