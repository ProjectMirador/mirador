import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { AudioViewer } from '../components/AudioViewer';
import { getConfig, getVisibleCanvasAudioResources, getVisibleCanvasCaptions } from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    audioOptions: getConfig(state).audioOptions,
    audioResources: getVisibleCanvasAudioResources(state, { windowId }) || [],
    captions: getVisibleCanvasCaptions(state, { windowId }) || [],
  }
);

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
  withPlugins('AudioViewer'),
);

export default enhance(AudioViewer);
