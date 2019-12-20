import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { OpenSeadragonViewer } from '../components/OpenSeadragonViewer';
import * as actions from '../state/actions';
import CanvasWorld from '../lib/CanvasWorld';
import {
  getCurrentCanvas,
  getSelectedAnnotationsOnCanvases,
  getHighlightedAnnotationsOnCanvases,
  getCanvasLabel,
  getManifestViewingDirection,
  getVisibleCanvases,
  getViewer,
  getSearchAnnotationsForWindow,
  getSelectedContentSearchAnnotations,
  getTheme,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = (state, { companionWindowId, windowId }) => ({
  canvasWorld: new CanvasWorld(
    getVisibleCanvases(state, { windowId }),
    getManifestViewingDirection(state, { windowId }),
  ),
  highlightedAnnotations: getHighlightedAnnotationsOnCanvases(state, { windowId }),
  label: getCanvasLabel(state, {
    canvasId: (getCurrentCanvas(state, { windowId }) || {}).id,
    windowId,
  }),
  osdConfig: state.config.osdConfig,
  palette: getTheme(state).palette,
  searchAnnotations: getSearchAnnotationsForWindow(
    state,
    { windowId },
  ),
  selectedAnnotations: getSelectedAnnotationsOnCanvases(state, { windowId }),
  selectedContentSearchAnnotations: getSelectedContentSearchAnnotations(state, { windowId }),
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

const styles = {
  osdContainer: {
    flex: 1,
    position: 'relative',
  },
};

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('OpenSeadragonViewer'),
);


export default enhance(OpenSeadragonViewer);
