import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { AudioViewer } from '../components/AudioViewer';
import { getVisibleCanvasAudioResources } from '../state/selectors';
/** */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    audioResources: getVisibleCanvasAudioResources(state, {
      windowId: windowId
    }) || []
  };
};
/** */


var styles = function styles() {
  return {
    audio: {
      width: '100%'
    },
    container: {
      alignItems: 'center',
      display: 'flex',
      width: '100%'
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, null), withPlugins('AudioViewer'));
export default enhance(AudioViewer);