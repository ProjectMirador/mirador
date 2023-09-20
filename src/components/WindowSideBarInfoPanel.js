import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CompanionWindow from '../containers/CompanionWindow';
import CanvasInfo from '../containers/CanvasInfo';
import LocalePicker from '../containers/LocalePicker';
import ManifestInfo from '../containers/ManifestInfo';
import CollectionInfo from '../containers/CollectionInfo';
import ManifestRelatedLinks from '../containers/ManifestRelatedLinks';
import ns from '../config/css-ns';

const StyledSection = styled('div')({
  borderBottom: '.5px solid',
});
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
      canvasIds,
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
        {
          canvasIds.map((canvasId, index) => (
            <StyledSection
              sx={{
                borderBottomColor: 'section_divider',
                paddingBottom: 1,
                paddingLeft: 2,
                paddingRight: 1,
                paddingTop: 2,
              }}
              key={canvasId}
            >
              <CanvasInfo
                id={id}
                canvasId={canvasId}
                index={index}
                totalSize={canvasIds.length}
                windowId={windowId}
              />
            </StyledSection>
          ))
        }
        { collectionPath.length > 0 && (
          <StyledSection sx={{
            borderBottomColor: 'section_divider',
            paddingBottom: 1,
            paddingLeft: 2,
            paddingRight: 1,
            paddingTop: 2,
          }}
          >
            <CollectionInfo id={id} windowId={windowId} />
          </StyledSection>
        )}

        <StyledSection sx={{
          borderBottomColor: 'section_divider',
          paddingBottom: 1,
          paddingLeft: 2,
          paddingRight: 1,
          paddingTop: 2,
        }}
        >
          <ManifestInfo id={id} windowId={windowId} />
        </StyledSection>

        <StyledSection sx={{
          borderBottomColor: 'section_divider',
          paddingBottom: 1,
          paddingLeft: 2,
          paddingRight: 1,
          paddingTop: 2,
        }}
        >
          <ManifestRelatedLinks id={id} windowId={windowId} />
        </StyledSection>
      </CompanionWindow>
    );
  }
}

WindowSideBarInfoPanel.propTypes = {
  availableLocales: PropTypes.arrayOf(PropTypes.string),
  canvasIds: PropTypes.arrayOf(PropTypes.string),
  collectionPath: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  locale: PropTypes.string,
  setLocale: PropTypes.func,
  showLocalePicker: PropTypes.bool,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarInfoPanel.defaultProps = {
  availableLocales: [],
  canvasIds: [],
  collectionPath: [],
  locale: '',
  setLocale: undefined,
  showLocalePicker: false,
  t: key => key,
};
