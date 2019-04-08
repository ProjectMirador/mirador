import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from '../containers/CompanionWindow';
import CanvasInfo from '../containers/CanvasInfo';
import LocalePicker from '../containers/LocalePicker';
import ManifestInfo from '../containers/ManifestInfo';
import ManifestRelatedLinks from '../containers/ManifestRelatedLinks';
import ns from '../config/css-ns';


/**
 * WindowSideBarInfoPanel
 */
export class WindowSideBarInfoPanel extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      windowId,
      id,
      classes,
      t,
      locale,
      setLocale,
      availableLocales,
      showLocalePicker,
    } = this.props;

    return (
      <CompanionWindow
        title={t('aboutThisItem')}
        paperClassName={ns('window-sidebar-info-panel')}
        windowId={windowId}
        id={id}
        titleControls={(
          showLocalePicker
            && (
            <LocalePicker
              locale={locale}
              setLocale={setLocale}
              availableLocales={availableLocales}
            />
            )
        )}
      >
        <div className={classes.section}>
          <CanvasInfo id={id} windowId={windowId} />
        </div>

        <div className={classes.section}>
          <ManifestInfo id={id} windowId={windowId} />
        </div>

        <div className={classes.section}>
          <ManifestRelatedLinks id={id} windowId={windowId} />
        </div>
      </CompanionWindow>
    );
  }
}

WindowSideBarInfoPanel.propTypes = {
  availableLocales: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.string.isRequired,
  locale: PropTypes.string,
  setLocale: PropTypes.func,
  showLocalePicker: PropTypes.bool,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarInfoPanel.defaultProps = {
  availableLocales: [],
  classes: {},
  locale: '',
  setLocale: undefined,
  showLocalePicker: false,
  t: key => key,
};
