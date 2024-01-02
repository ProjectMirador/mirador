import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSize } from 'react-sizeme';
import { withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withPlugins } from '../extend/withPlugins';
import { getWorkspace } from '../state/selectors';
import { WindowCanvasNavigationControlsVideo } from '../components/WindowCanvasNavigationControlsVideo';
import * as actions from '../state/actions';

/** */
const mapStateToProps = (state, { windowId }) => ({
  visible: getWorkspace(state).focusedWindowId === windowId,
});

/** */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setPaused: (...args) => dispatch(actions.setWindowPaused(windowId, ...args)),
});

/**
 *
 * @param theme
 */
const styles = theme => ({
  canvasNav: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
  },
  canvasNavStacked: {
    flexDirection: 'column',
  },
  controls: {
    backgroundColor: fade(theme.palette.background.paper, 0.5),
    bottom: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 50,
  },
});

const enhance = compose(
  connect(mapStateToProps),
  withStyles(styles),
  withSize(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowCanvasNavigationControlsVideo'),
);

export default enhance(WindowCanvasNavigationControlsVideo);
