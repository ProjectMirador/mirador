import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { OpenSeadragonViewer } from '../components/OpenSeadragonViewer';
import * as actions from '../state/actions';
import {
  getVisibleCanvasNonTiledResources,
  getCurrentCanvas,
  getCanvasLabel,
  getViewer,
  getConfig,
  getCompanionWindowsForContent,
  selectInfoResponses,
  getCurrentCanvasWorld,
} from '../state/selectors';

/**
 * Hooks-based replacement for the old connect()/compose(withPlugins()) container
 */
function OpenSeadragonViewerContainer({ windowId, ...rest }) {
  const dispatch = useDispatch();

  const canvasWorld = useSelector((state) => getCurrentCanvasWorld(state, { windowId }));
  const infoResponses = useSelector(selectInfoResponses);
  const config = useSelector(getConfig);
  const hasAnnotationsCompanionWindow = useSelector(
    (state) => getCompanionWindowsForContent(state, { content: 'annotations', windowId }).length > 0,
  );
  const hasSearchCompanionWindow = useSelector(
    (state) => getCompanionWindowsForContent(state, { content: 'search', windowId }).length > 0,
  );
  const label = useSelector((state) =>
    getCanvasLabel(state, {
      canvasId: (getCurrentCanvas(state, { windowId }) || {}).id,
      windowId,
    }),
  );
  const nonTiledImages = useSelector((state) => getVisibleCanvasNonTiledResources(state, { windowId }));
  const viewerConfig = useSelector((state) => getViewer(state, { windowId }));

  const imageServiceIds = canvasWorld.canvases.flatMap((c) => c.imageServiceIds);

  return (
    <OpenSeadragonViewer
      {...rest}
      windowId={windowId}
      canvasWorld={canvasWorld}
      drawAnnotations={config.window.forceDrawAnnotations || hasAnnotationsCompanionWindow || hasSearchCompanionWindow}
      infoResponses={imageServiceIds
        .map((id) => infoResponses[id])
        .filter(
          (infoResponse) => infoResponse !== undefined && infoResponse.isFetching === false && infoResponse.error === undefined,
        )}
      label={label}
      nonTiledImages={nonTiledImages}
      osdConfig={config.osdConfig}
      viewerConfig={viewerConfig}
      updateViewport={(...args) => dispatch(actions.updateViewport(...args))}
    />
  );
}

OpenSeadragonViewerContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default withPlugins('OpenSeadragonViewer')(OpenSeadragonViewerContainer);
