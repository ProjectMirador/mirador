import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
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

/** */
const styles = () => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  video: {
    maxHeight: '100%',
    width: '100%',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWindowContext,
  connect(mapStateToProps, null),
  withPlugins('VideoViewer'),
);

export default enhance(VideoViewer);
