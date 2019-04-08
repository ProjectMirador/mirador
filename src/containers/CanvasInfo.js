import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import {
  getDestructuredMetadata,
  getCanvasLabel,
  getSelectedCanvas,
  getCanvasDescription,
} from '../state/selectors';
import { CanvasInfo } from '../components/CanvasInfo';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => ({
  canvasDescription: getCanvasDescription(state, { canvasIndex: 'selected', companionWindowId: id, windowId }),
  canvasLabel: getCanvasLabel(state, { canvasIndex: 'selected', companionWindowId: id, windowId }),
  canvasMetadata: getDestructuredMetadata(
    getSelectedCanvas(state, { companionWindowId: id, windowId }),
  ),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('CanvasInfo'),
);

export default enhance(CanvasInfo);
