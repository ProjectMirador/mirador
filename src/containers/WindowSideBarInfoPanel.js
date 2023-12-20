import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import {
  getCompanionWindow,
  getManifestLocale,
  getMetadataLocales,
  getVisibleCanvasIds,
  getWindowConfig,
  getWindow,
} from '../state/selectors';
import { WindowSideBarInfoPanel } from '../components/WindowSideBarInfoPanel';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => ({
  availableLocales: getMetadataLocales(state, { companionWindowId: id, windowId }),
  canvasIds: getVisibleCanvasIds(state, { windowId }),
  collectionPath: (getWindow(state, { windowId }) || {}).collectionPath,
  locale: getCompanionWindow(state, { companionWindowId: id }).locale
    || getManifestLocale(state, { windowId }),
  showLocalePicker: getWindowConfig(state, { windowId }).showLocalePicker,
});

/** */
const mapDispatchToProps = (dispatch, { windowId, id }) => ({
  setLocale: locale => dispatch(actions.updateCompanionWindow(windowId, id, { locale })),
});

/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */
const styles = theme => ({
  section: {
    borderBottom: `.5px solid ${theme.palette.section_divider}`,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarInfoPanel'),
);

export default enhance(WindowSideBarInfoPanel);
