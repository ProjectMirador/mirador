import { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from '../containers/CompanionWindow';
import CanvasInfo from '../containers/CanvasInfo';
import LocalePicker from '../containers/LocalePicker';
import ManifestInfo from '../containers/ManifestInfo';
import CollectionInfo from '../containers/CollectionInfo';
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
      id,
      canvasIds,
      classes,
      collectionPath,
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
        {
          canvasIds.map((canvasId, index) => (
            <div key={canvasId} className={classes.section}>
              <CanvasInfo
                id={id}
                canvasId={canvasId}
                index={index}
                totalSize={canvasIds.length}
              />
            </div>
          ))
        }
        { collectionPath.length > 0 && (
          <div className={classes.section}>
            <CollectionInfo id={id} />
          </div>
        )}

        <div className={classes.section}>
          <ManifestInfo id={id} />
        </div>

        <div className={classes.section}>
          <ManifestRelatedLinks id={id} />
        </div>
      </CompanionWindow>
    );
  }
}

WindowSideBarInfoPanel.propTypes = {
  availableLocales: PropTypes.arrayOf(PropTypes.string),
  canvasIds: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.objectOf(PropTypes.string),
  collectionPath: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  locale: PropTypes.string,
  setLocale: PropTypes.func,
  showLocalePicker: PropTypes.bool,
  t: PropTypes.func,
};

WindowSideBarInfoPanel.defaultProps = {
  availableLocales: [],
  canvasIds: [],
  classes: {},
  collectionPath: [],
  locale: '',
  setLocale: undefined,
  showLocalePicker: false,
  t: key => key,
};
