import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import MiradorCanvas from '../lib/MiradorCanvas';
import {
  getCanvases,
  getVisibleCanvases,
  getCompanionWindowsForPosition,
  getAnnotationResourcesByMotivation,
  getManifestSearchService,
  getMiradorCanvasWrapper,
  getSearchQuery,
  getWindow,
  getWindowConfig,
} from '../state/selectors';
import { WindowSideBarButtons } from '../components/WindowSideBarButtons';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowSideButtons
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  addCompanionWindow: content => dispatch(
    actions.addOrUpdateCompanionWindow(windowId, { content, position: 'left' }),
  ),
});

/** */
function hasLayers(canvases, getMiradorCanvas) {
  return canvases && canvases.some(c => getMiradorCanvas(c).imageResources.length > 1);
}

/** */
function hasAnnotations(canvases, getMiradorCanvas) {
  return canvases && canvases.some(c => {
    const canvas = getMiradorCanvas(c);

    return canvas.annotationListUris.length > 0
      || canvas.canvasAnnotationPages.length > 0;
  });
}

/** */
function hasSearchResults(state, { windowId }) {
  const { suggestedSearches } = getWindow(state, { windowId });
  const companionWindowId = getCompanionWindowsForPosition(state, { position: 'left', windowId })?.[0]?.id;
  const searchQuery = getSearchQuery(state, { companionWindowId, windowId });

  return Boolean(suggestedSearches || searchQuery);
}

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideButtons
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  hasAnnotations: getAnnotationResourcesByMotivation(
    state,
    { windowId },
  ).length > 0,
  hasAnyAnnotations: hasAnnotations(getCanvases(state, { windowId }), getMiradorCanvasWrapper(state)),
  hasAnyLayers: hasLayers(getCanvases(state, { windowId }), getMiradorCanvasWrapper(state)),
  hasCurrentLayers: hasLayers(getVisibleCanvases(state, { windowId }), getMiradorCanvasWrapper(state)),
  hasSearchResults: hasSearchResults(state, { windowId }),
  hasSearchService: getManifestSearchService(state, { windowId }) !== null,
  panels: getWindowConfig(state, { windowId }).panels,
  sideBarPanel: ((getCompanionWindowsForPosition(state, { position: 'left', windowId }))[0] || {}).content,
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarButtons'),
);

export default enhance(WindowSideBarButtons);
