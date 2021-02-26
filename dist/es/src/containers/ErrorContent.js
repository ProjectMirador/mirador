import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { ErrorContent } from '../components/ErrorContent';
import { getCompanionWindow, getManifest, getWindow, getViewer, getConfig } from '../state/selectors';
/** mapStateToProps */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var companionWindowId = _ref.companionWindowId,
      windowId = _ref.windowId;
  return {
    metadata: {
      companionWindow: companionWindowId && getCompanionWindow(state, {
        companionWindowId: companionWindowId
      }),
      manifest: getManifest(state, {
        windowId: windowId
      }),
      viewer: getViewer(state, {
        windowId: windowId
      }),
      window: getWindow(state, {
        windowId: windowId
      })
    },
    showJsError: getConfig(state).window.showJsError
  };
};
/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */


var styles = function styles(theme) {
  return {
    alert: {
      '& $icon': {
        color: theme.palette.error.main
      },
      backgroundColor: theme.palette.error.main,
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium
    },
    details: {
      '& pre': {
        height: '100px',
        overflowY: 'scroll'
      },
      flexDirection: 'column'
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps), withPlugins('ErrorContent'));
export default enhance(ErrorContent);