import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import {
  getDestructuredMetadata,
  getCanvas,
  getCanvasLabel,
  getCanvasDescription,
} from '../state/selectors';
import { CanvasInfo } from '../components/CanvasInfo';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { canvasId, id, windowId }) => ({
  canvasDescription: getCanvasDescription(state, { canvasId, companionWindowId: id, windowId }),
  canvasLabel: getCanvasLabel(state, { canvasId, companionWindowId: id, windowId }),
  canvasMetadata: getDestructuredMetadata(
    getCanvas(state, { canvasId, companionWindowId: id, windowId }),
  ),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('CanvasInfo'),
);

export default enhance(CanvasInfo);
