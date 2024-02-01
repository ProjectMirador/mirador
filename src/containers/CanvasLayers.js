import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from '../state/actions';
import {
  getCanvasLabel,
  getLayers,
  getSortedLayers,
} from '../state/selectors';
import { CanvasLayers } from '../components/CanvasLayers';

/** For connect */
const mapStateToProps = (state, { canvasId, companionWindowId, windowId }) => ({
  label: getCanvasLabel(state, { canvasId, companionWindowId, windowId }),
  layerMetadata: getLayers(state, { canvasId, companionWindowId, windowId }),
  layers: getSortedLayers(state, { canvasId, companionWindowId, windowId }),
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapDispatchToProps = {
  updateLayers: actions.updateLayers,
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(CanvasLayers);
