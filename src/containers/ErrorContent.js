import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withStyles from '@mui/styles/withStyles';
import { withPlugins } from '../extend/withPlugins';
import { ErrorContent } from '../components/ErrorContent';
import {
  getCompanionWindow,
  getManifest,
  getWindow,
  getViewer,
  getConfig,
} from '../state/selectors';

/** mapStateToProps */
const mapStateToProps = (state, { companionWindowId, windowId }) => ({
  metadata: {
    companionWindow: companionWindowId && getCompanionWindow(state, { companionWindowId }),
    manifest: getManifest(state, { windowId }),
    viewer: getViewer(state, { windowId }),
    window: getWindow(state, { windowId }),
  },
  showJsError: getConfig(state).window.showJsError,
});

/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */
const styles = theme => ({
  alert: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  details: {
    '& pre': {
      height: '100px',
      overflowY: 'scroll',
    },
    flexDirection: 'column',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps),
  withPlugins('ErrorContent'),
);

export default enhance(ErrorContent);
