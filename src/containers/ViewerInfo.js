import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import { ViewerInfo } from '../components/ViewerInfo';
import { getCanvasLabel, getManifestoInstance, getManifestCanvases } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof Window
 * @private
 */
const mapStateToProps = (state, props) => {
  const { windowId } = props;
  const manifest = getManifestoInstance(state, { windowId });
  const canvases = getManifestCanvases(manifest);
  const { canvasIndex } = state.windows[windowId];

  return {
    canvasCount: canvases.length,
    canvasIndex,
    canvasLabel: getCanvasLabel(canvases[canvasIndex], canvasIndex),
  };
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
  withPlugins('ViewerInfo'),
);

export default enhance(ViewerInfo);
