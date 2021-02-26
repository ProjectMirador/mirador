import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { getManifestoInstance, getVisibleCanvasAudioResources, getVisibleCanvasVideoResources, getWindow } from '../state/selectors';
import { PrimaryWindow } from '../components/PrimaryWindow';
/** */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  var manifestoInstance = getManifestoInstance(state, {
    windowId: windowId
  });
  return {
    audioResources: getVisibleCanvasAudioResources(state, {
      windowId: windowId
    }) || [],
    isCollection: manifestoInstance && manifestoInstance.isCollection(),
    isCollectionDialogVisible: getWindow(state, {
      windowId: windowId
    }).collectionDialogOn,
    videoResources: getVisibleCanvasVideoResources(state, {
      windowId: windowId
    }) || []
  };
};

var styles = {
  primaryWindow: {
    display: 'flex',
    flex: 1,
    position: 'relative'
  }
};
var enhance = compose(withStyles(styles), connect(mapStateToProps, null), withPlugins('PrimaryWindow'));
export default enhance(PrimaryWindow);