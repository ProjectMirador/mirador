import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSize } from 'react-sizeme';
import { withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withPlugins } from '../extend/withPlugins';
import {
  getCanvasLabel,
} from '../state/selectors';
import { WindowCanvasNavigationControls } from '../components/WindowCanvasNavigationControls';

/** */
const mapStateToProps = (state, { windowId }) => ({
  canvasLabel: getCanvasLabel(state, {
    windowId,
  }),
  visible: state.workspace.focusedWindowId === windowId,
});

/**
 *
 * @param theme
 */
const styles = theme => ({
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
