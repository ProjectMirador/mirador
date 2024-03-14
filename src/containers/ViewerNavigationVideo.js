import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { ViewerNavigationVideo } from '../components/ViewerNavigationVideo';
import {
  getCurrentCanvasDuration,
  getWindowCurrentTime,
  getWindowMutedStatus,
  getWindowPausedStatus,
  getWindowTextTrackDisabledStatus,
  getWindowHasTextTrack,
} from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => ({
  currentTime: getWindowCurrentTime(state, { windowId }),
  duration: getCurrentCanvasDuration(state, { windowId }),
  hasTextTrack: getWindowHasTextTrack(state, { windowId }),
  muted: getWindowMutedStatus(state, { windowId }),
  paused: getWindowPausedStatus(state, { windowId }),
  textTrackDisabled: getWindowTextTrackDisabledStatus(state, { windowId }),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setCurrentTime: (...args) => dispatch(actions.setWindowCurrentTime(windowId, ...args)),
  setMuted: (...args) => dispatch(actions.setWindowMuted(windowId, ...args)),
  setPaused: (...args) => dispatch(actions.setWindowPaused(windowId, ...args)),
  setSeekTo: (...args) => dispatch(actions.setWindowSeekTo(windowId, ...args)),
  setTextTrackDisabled: (...args) => dispatch(
    actions.setWindowTextTrackDisabled(windowId, ...args),
  ),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ViewerNavigationVideo'),
  // further HOC go here
);

export default enhance(ViewerNavigationVideo);
