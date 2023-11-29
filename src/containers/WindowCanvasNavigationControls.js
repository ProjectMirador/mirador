import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSize } from 'react-sizeme';
import { withPlugins } from '../extend/withPlugins';
import { getShowZoomControlsConfig, getWorkspace } from '../state/selectors';
import { WindowCanvasNavigationControls } from '../components/WindowCanvasNavigationControls';

/** */
const mapStateToProps = (state, { windowId }) => ({
  showZoomControls: getShowZoomControlsConfig(state),
  visible: getWorkspace(state).focusedWindowId === windowId,
});

const enhance = compose(
  connect(mapStateToProps),
  withSize(),
  withPlugins('WindowCanvasNavigationControls'),
);

export default enhance(WindowCanvasNavigationControls);
