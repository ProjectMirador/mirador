import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { VideoViewer } from '../components/VideoViewer';
import {
  getConfig,
  getCurrentCanvas,
  getCurrentCanvasWorld,
  getWindowMutedStatus,
  getWindowPausedStatus,
  getWindowCurrentTime,
  getWindowTextTrackDisabledStatus,
  getPresentAnnotationsOnSelectedCanvases,
} from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => ({
  annotations: getPresentAnnotationsOnSelectedCanvases(state, { windowId }),
  canvas: (getCurrentCanvas(state, { windowId }) || {}),
  canvasWorld: getCurrentCanvasWorld(state, { windowId }),
  currentTime: getWindowCurrentTime(state, { windowId }),
  debug: getConfig(state).debug || false,
  muted: getWindowMutedStatus(state, { windowId }),
  paused: getWindowPausedStatus(state, { windowId }),
  textTrackDisabled: getWindowTextTrackDisabledStatus(state, { windowId }),
  videoOptions: getConfig(state).videoOptions,
});

/** */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setCurrentTime: (...args) => dispatch(actions.setWindowCurrentTime(windowId, ...args)),
  setHasTextTrack: (...args) => dispatch(actions.setWindowHasTextTrack(windowId, ...args)),
  setPaused: (...args) => dispatch(actions.setWindowPaused(windowId, ...args)),
  setSeekTo: (...args) => dispatch(actions.setWindowSeekTo(windowId, ...args)),
});

const enhance = compose(
  withTranslation(), // TODO Merge probably useless
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('VideoViewer'),
);

export default enhance(VideoViewer);
