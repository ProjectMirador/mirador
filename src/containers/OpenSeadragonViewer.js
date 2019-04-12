import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import { OpenSeadragonViewer } from '../components/OpenSeadragonViewer';
import * as actions from '../state/actions';
import CanvasWorld from '../lib/CanvasWorld';
import {
  getSelectedAnnotationsOnCanvases,
  getHighlightedAnnotationsOnCanvases,
  getCanvasLabel,
  getSelectedCanvases,
  getViewer,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  canvasWorld: new CanvasWorld(getSelectedCanvases(state, { windowId })),
  highlightedAnnotations: getHighlightedAnnotationsOnCanvases(state, { windowId }),
  label: getCanvasLabel(state, { windowId }),
  selectedAnnotations: getSelectedAnnotationsOnCanvases(state, { windowId }),
  viewer: getViewer(state, { windowId }),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  updateViewport: actions.updateViewport,
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('OpenSeadragonViewer'),
);


export default enhance(OpenSeadragonViewer);
