import { connect } from 'react-redux';
import { compose } from 'redux';
import { withPlugins } from '../extend/withPlugins';
import { VideoViewer } from '../components/VideoViewer';
import { getConfig, getVisibleCanvasCaptions, getVisibleCanvasVideoResources, getCurrentCanvas } from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => ({
  captions: getVisibleCanvasCaptions(state, { windowId }) || [],
  canvasId: getCurrentCanvas(state, { windowId }).id,
  videoOptions: getConfig(state).videoOptions,
  videoResources: getVisibleCanvasVideoResources(state, { windowId }) || [],
});

const enhance = compose(connect(mapStateToProps, null), withPlugins('VideoViewer'));

export default enhance(VideoViewer);
