import { connect } from 'react-redux';
import { compose } from 'redux';
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
);

export default enhance(WindowCanvasNavigationControls);
