import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSize } from 'react-sizeme';
import { withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withPlugins } from '../extend/withPlugins';
import {
  getCurrentCanvas,
  getCanvasLabel,
} from '../state/selectors';
import { WindowCanvasNavigationControls } from '../components/WindowCanvasNavigationControls';

/** */
const mapStateToProps = (state, { windowId }) => ({
  canvasLabel: getCanvasLabel(state, {
    canvasId: (getCurrentCanvas(state, { windowId }) || {}).id,
    windowId,
  }),
  visible: state.workspace.focusedWindowId === windowId,
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
  withPlugins('WindowCanvasNavigationControls'),
);

export default enhance(WindowCanvasNavigationControls);
