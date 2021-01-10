import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { ViewerNavigationVideo } from '../components/ViewerNavigationVideo';
import {
  getCurrentCanvasDuration,
  getWindowCurrentTime,
  getWindowMutedStatus,
  getWindowPausedStatus,
} from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => ({
  currentTime: getWindowCurrentTime(state, { windowId }),
  duration: getCurrentCanvasDuration(state, { windowId }),
  muted: getWindowMutedStatus(state, { windowId }),
  paused: getWindowPausedStatus(state, { windowId }),
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
});

const styles = {
  divider: {
    borderRight: '1px solid #808080',
    display: 'inline-block',
    height: '24px',
    margin: '12px 6px',
  },
  ListItem: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  play_controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sliderDiv: {
    alignItems: 'center',
    display: 'flex',
    paddingLeft: '10px',
    paddingRight: '15px',
    width: '200px',
  },
  timeLabel: {
    alignItems: 'center',
    display: 'flex',
  },
};

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ViewerNavigationVideo'),
  // further HOC go here
);

export default enhance(ViewerNavigationVideo);
