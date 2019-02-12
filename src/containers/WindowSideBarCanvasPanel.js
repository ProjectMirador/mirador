import { compose } from 'redux';
import { connect } from 'react-redux';
import WindowSideBarCanvasPanel from '../components/WindowSideBarCanvasPanel';
import { getManifestCanvases, getWindowManifest } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { windowId }) => ({
  canvases: getManifestCanvases(getWindowManifest(state, windowId)),
});

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(WindowSideBarCanvasPanel);
