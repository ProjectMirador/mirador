import { connect } from 'react-redux';
import { compose } from 'redux';
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

const enhance = compose(
  withWindowContext,
  connect(mapStateToProps, null),
  withPlugins('AudioViewer'),
);

export default enhance(AudioViewer);
