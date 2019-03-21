import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withPlugins } from '../extend';
import { OpenSeadragonViewer } from '../components/OpenSeadragonViewer';
import * as actions from '../state/actions';
import CanvasWorld from '../lib/CanvasWorld';
import {
  getAllOrSelectedAnnotations,
  getCanvasLabel,
  getSelectedAnnotationIds,
  getSelectedCanvases,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  annotations: getAllOrSelectedAnnotations(
    state,
    windowId,
    getSelectedCanvases(state, { windowId }),
    getSelectedAnnotationIds(state, windowId, getSelectedCanvases(state, { windowId })),
  ),
  canvasWorld: new CanvasWorld(getSelectedCanvases(state, { windowId })),
  label: getCanvasLabel(state, { canvasIndex: 'selected', windowId }),
  viewer: state.viewers[windowId],
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  updateViewport: actions.updateViewport,
};

/**
 *
 * @param theme
 * @returns {{windowSideBarHeading: *}}
 */
const styles = theme => ({
  controls: {
    backgroundColor: fade(theme.palette.background.paper, 0.5),
    bottom: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 50,
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('OpenSeadragonViewer'),
);


export default enhance(OpenSeadragonViewer);
