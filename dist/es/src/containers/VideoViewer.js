import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { VideoViewer } from '../components/VideoViewer';
import { getVisibleCanvasCaptions, getVisibleCanvasVideoResources } from '../state/selectors';
/** */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    captions: getVisibleCanvasCaptions(state, {
      windowId: windowId
    }) || [],
    videoResources: getVisibleCanvasVideoResources(state, {
      windowId: windowId
    }) || []
  };
};
/** */


var styles = function styles() {
  return {
    container: {
      alignItems: 'center',
      display: 'flex',
      width: '100%'
    },
    video: {
      maxHeight: '100%',
      width: '100%'
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, null), withPlugins('VideoViewer'));
export default enhance(VideoViewer);