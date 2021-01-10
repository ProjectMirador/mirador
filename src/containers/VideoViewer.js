import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { VideoViewer } from '../components/VideoViewer';
import {
  getCurrentCanvas,
  getCurrentCanvasWorld,
  getWindowMutedStatus,
  getWindowPausedStatus,
  getWindowCurrentTime,
} from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => ({
  canvas: (getCurrentCanvas(state, { windowId }) || {}),
  canvasWorld: getCurrentCanvasWorld(state, { windowId }),
  currentTime: getWindowCurrentTime(state, { windowId }),
  muted: getWindowMutedStatus(state, { windowId }),
  paused: getWindowPausedStatus(state, { windowId }),
});

/** */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setCurrentTime: (...args) => dispatch(actions.setWindowCurrentTime(windowId, ...args)),
  setPaused: (...args) => dispatch(actions.setWindowPaused(windowId, ...args)),
});

/** */
const styles = () => ({
  flexContainer: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  flexFill: {
    height: '100%',
    position: 'relative',
    width: '100%',
  },
  video: {
    height: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    'object-fit': 'scale-down',
    'object-position': 'left top',
    width: '100%',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('VideoViewer'),
);

export default enhance(VideoViewer);
