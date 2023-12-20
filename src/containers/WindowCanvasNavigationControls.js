import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSize } from 'react-sizeme';
import { withStyles } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { withPlugins } from '../extend/withPlugins';
import { getWorkspace } from '../state/selectors';
import { WindowCanvasNavigationControls } from '../components/WindowCanvasNavigationControls';
import { withWindowContext } from '../contexts/WindowContext';

/** */
const mapStateToProps = (state, { windowId }) => ({
  visible: getWorkspace(state).focusedWindowId === windowId,
});

/**
 *
 * @param theme
 */
const styles = theme => ({
  canvasNav: {
    cursor: 'default',
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
    backgroundColor: alpha(theme.palette.background.paper, 0.5),
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
  withWindowContext,
  withPlugins('WindowCanvasNavigationControls'),
);

export default enhance(WindowCanvasNavigationControls);
