import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSize } from 'react-sizeme';
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
  canvasNavStacked: {
    flexDirection: 'column',
  },
});

const enhance = compose(
  connect(mapStateToProps),
  withSize(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowCanvasNavigationControlsVideo'),
);

export default enhance(WindowCanvasNavigationControlsVideo);
