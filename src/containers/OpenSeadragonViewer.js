import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import flatten from 'lodash/flatten';
import { withPlugins } from '../extend/withPlugins';
import { OpenSeadragonViewer } from '../components/OpenSeadragonViewer';
import * as actions from '../state/actions';
import CanvasWorld from '../lib/CanvasWorld';
import {
  getVisibleCanvasNonTiledResources,
  getSequenceViewingDirection,
  getLayersForVisibleCanvases,
  getVisibleCanvases,
  getViewer,
  getConfig,
  getCompanionWindowsForContent,
  selectInfoResponses,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = (state, { windowId }) => {
  const canvasWorld = new CanvasWorld(
    getVisibleCanvases(state, { windowId }),
    getLayersForVisibleCanvases(state, { windowId }),
    getSequenceViewingDirection(state, { windowId }),
  );

  const infoResponses = selectInfoResponses(state);
  const imageServiceIds = flatten(canvasWorld.canvases.map(c => c.imageServiceIds));

  return {
    canvasWorld,
    drawAnnotations: getConfig(state).window.forceDrawAnnotations
      || getCompanionWindowsForContent(state, { content: 'annotations', windowId }).length > 0
      || getCompanionWindowsForContent(state, { content: 'search', windowId }).length > 0,
    infoResponses: imageServiceIds.map(id => infoResponses[id])
      .filter(infoResponse => (infoResponse !== undefined
        && infoResponse.isFetching === false
        && infoResponse.error === undefined)),
    nonTiledImages: getVisibleCanvasNonTiledResources(state, { windowId }),
    osdConfig: state.config.osdConfig,
    viewerConfig: getViewer(state, { windowId }),
  };
};

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
