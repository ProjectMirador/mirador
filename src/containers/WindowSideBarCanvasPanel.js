import { compose } from 'redux';
import { connect } from 'react-redux';
import WindowSideBarCanvasPanel from '../components/WindowSideBarCanvasPanel';
import {
  getManifestCanvases,
  getWindowManifest,
  getIdAndLabelOfCanvases,
} from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { windowId }) => {
  const manifest = getWindowManifest(state, windowId);
  const canvases = getManifestCanvases(manifest);
  return {
    canvasesIdAndLabel: getIdAndLabelOfCanvases(canvases),
  };
};

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(WindowSideBarCanvasPanel);
