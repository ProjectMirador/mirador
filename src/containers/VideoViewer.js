import { connect } from 'react-redux';
import { compose } from 'redux';
import { withPlugins } from '../extend/withPlugins';
import { VideoViewer } from '../components/VideoViewer';
import { getConfig, getVisibleCanvasCaptions, getVisibleCanvasVideoResources } from '../state/selectors';
import { withWindowContext } from '../contexts/WindowContext';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    captions: getVisibleCanvasCaptions(state, { windowId }) || [],
    videoOptions: getConfig(state).videoOptions,
    videoResources: getVisibleCanvasVideoResources(state, { windowId }) || [],
  }
);

const enhance = compose(
  withWindowContext,
  connect(mapStateToProps, null),
  withPlugins('VideoViewer'),
);

export default enhance(VideoViewer);
