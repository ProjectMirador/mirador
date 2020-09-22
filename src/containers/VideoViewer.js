import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { VideoViewer } from '../components/VideoViewer';
import { getVisibleCanvasVideoResources } from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
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
    width: '100%',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, null),
  withPlugins('VideoViewer'),
);

export default enhance(VideoViewer);
