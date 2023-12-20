import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { AudioViewer } from '../components/AudioViewer';
import { getConfig, getVisibleCanvasAudioResources, getVisibleCanvasCaptions } from '../state/selectors';
import { withWindowContext } from '../contexts/WindowContext';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    audioOptions: getConfig(state).audioOptions,
    audioResources: getVisibleCanvasAudioResources(state, { windowId }) || [],
    captions: getVisibleCanvasCaptions(state, { windowId }) || [],
  }
);

/** */
const styles = () => ({
  audio: {
    width: '100%',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWindowContext,
  connect(mapStateToProps, null),
  withPlugins('AudioViewer'),
);

export default enhance(AudioViewer);
