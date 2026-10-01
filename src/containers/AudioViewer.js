import { connect } from 'react-redux';
import { compose } from 'redux';
import { withPlugins } from '../extend/withPlugins';
import { AudioViewer } from '../components/AudioViewer';
import {
  getConfig,
  getVisibleCanvasAudioResources,
  getVisibleCanvasCaptions,
  getCurrentCanvas,
  getWindow,
} from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => ({
  audioOptions: getConfig(state).audioOptions,
  audioResources: getVisibleCanvasAudioResources(state, { windowId }) || [],
  captions: getVisibleCanvasCaptions(state, { windowId }) || [],
  canvasId: getCurrentCanvas(state, { windowId }).id,
  startTime: getWindow(state, { windowId })?.startTime,
});

const enhance = compose(connect(mapStateToProps, null), withPlugins('AudioViewer'));

export default enhance(AudioViewer);
