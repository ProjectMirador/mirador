import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import flatten from 'lodash/flatten';
import { withPlugins } from '../extend/withPlugins';
import { OpenSeadragonViewer } from '../components/OpenSeadragonViewer';
import * as actions from '../state/actions';
import { getVisibleCanvasNonTiledResources, getCurrentCanvas, getCanvasLabel, getViewer, getConfig, getCompanionWindowsForContent, selectInfoResponses, getCurrentCanvasWorld } from '../state/selectors';
/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  var canvasWorld = getCurrentCanvasWorld(state, {
    windowId: windowId
  });
  var infoResponses = selectInfoResponses(state);
  var imageServiceIds = flatten(canvasWorld.canvases.map(function (c) {
    return c.imageServiceIds;
  }));
  return {
    canvasWorld: canvasWorld,
    drawAnnotations: getConfig(state).window.forceDrawAnnotations || getCompanionWindowsForContent(state, {
      content: 'annotations',
      windowId: windowId
    }).length > 0 || getCompanionWindowsForContent(state, {
      content: 'search',
      windowId: windowId
    }).length > 0,
    infoResponses: imageServiceIds.map(function (id) {
      return infoResponses[id];
    }).filter(function (infoResponse) {
      return infoResponse !== undefined && infoResponse.isFetching === false && infoResponse.error === undefined;
    }),
    label: getCanvasLabel(state, {
      canvasId: (getCurrentCanvas(state, {
        windowId: windowId
      }) || {}).id,
      windowId: windowId
    }),
    nonTiledImages: getVisibleCanvasNonTiledResources(state, {
      windowId: windowId
    }),
    osdConfig: getConfig(state).osdConfig,
    viewerConfig: getViewer(state, {
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */


var mapDispatchToProps = {
  updateViewport: actions.updateViewport
};
var styles = {
  osdContainer: {
    flex: 1,
    position: 'relative'
  }
};
var enhance = compose(withStyles(styles), withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('OpenSeadragonViewer'));
export default enhance(OpenSeadragonViewer);