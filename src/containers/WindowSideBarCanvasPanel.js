import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '../state/actions';
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

const mapDispatchToProps = { setCanvas: actions.setCanvas };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces(),
);

export default enhance(WindowSideBarCanvasPanel);
