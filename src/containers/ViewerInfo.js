import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import { ViewerInfo } from '../components/ViewerInfo';
import { getCanvasLabel, getManifestCanvases } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof Window
 * @private
 */
const mapStateToProps = (state, props) => {
  const { windowId } = props;
  const canvases = getManifestCanvases(state, { windowId });
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
