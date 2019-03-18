import { connect } from 'react-redux';
import { compose } from 'redux';
import { withPlugins } from '../extend';
import {
  getCanvasLabel,
  getSelectedCanvas,
} from '../state/selectors';
import { WindowCanvasNavigationControls } from '../components/WindowCanvasNavigationControls';

/** */
const mapStateToProps = (state, { windowId }) => ({
  window: state.windows[windowId],
  canvasLabel: getCanvasLabel(
    getSelectedCanvas(state, windowId),
    state.windows[windowId].canvasIndex,
  ),
  visible: state.workspace.focusedWindowId === windowId,
});

const enhance = compose(
  connect(mapStateToProps),
  withPlugins('WindowCanvasNavigationControls'),
);

export default enhance(WindowCanvasNavigationControls);
