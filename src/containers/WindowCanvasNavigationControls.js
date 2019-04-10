import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSize } from 'react-sizeme';
import { withPlugins } from '../extend';
import {
  getCanvasLabel,
  getWindow,
} from '../state/selectors';
import { WindowCanvasNavigationControls } from '../components/WindowCanvasNavigationControls';

/** */
const mapStateToProps = (state, { windowId }) => ({
  canvasLabel: getCanvasLabel(state, {
    canvasIndex: 'selected',
    windowId,
  }),
  visible: state.workspace.focusedWindowId === windowId,
  window: getWindow(state, { windowId }),
});

const enhance = compose(
  connect(mapStateToProps),
  withSize(),
  withPlugins('WindowCanvasNavigationControls'),
);

export default enhance(WindowCanvasNavigationControls);
