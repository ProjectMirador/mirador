import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import {
  getCanvasLabel,
  getLayers,
  getSortedLayers,
} from '../state/selectors';
import { CanvasLayers } from '../components/CanvasLayers';

/** For connect */
const mapStateToProps = (state, { canvasId, windowId }) => ({
  label: getCanvasLabel(state, { canvasId, windowId }),
  layerMetadata: getLayers(state, { canvasId, windowId }),
  layers: getSortedLayers(state, { canvasId, windowId }),
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
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(CanvasLayers);
