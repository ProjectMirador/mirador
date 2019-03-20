import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withPlugins } from '../extend';
import { OpenSeadragonViewer } from '../components/OpenSeadragonViewer';
import * as actions from '../state/actions';
import {
  getCanvasLabel,
  getSelectedAnnotationIds,
  getSelectedCanvas,
  getSelectedTargetAnnotationResources,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({
  viewers, windows, manifests, annotations,
}, { windowId, currentCanvases }) => ({
  viewer: viewers[windowId],
  label: getCanvasLabel(
    getSelectedCanvas({ windows, manifests }, { windowId }),
    windows[windowId].canvasIndex,
  ),
  annotations: getSelectedTargetAnnotationResources(
    { annotations },
    currentCanvases.map(c => c.id),
    getSelectedAnnotationIds({ windows }, windowId, currentCanvases.map(c => c.id)),
  ),
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
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 50,
    backgroundColor: fade(theme.palette.background.paper, 0.5),
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('OpenSeadragonViewer'),
);


export default enhance(OpenSeadragonViewer);
