import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { OpenSeadragonViewer } from '../components/OpenSeadragonViewer';
import InfoResponseTileSource from './InfoResponseTileSource';
import * as actions from '../state/actions';
import { getIiifResourceImageService } from '../lib/iiif';
import {
  getVisibleCanvasNonTiledResources,
  getCurrentCanvas,
  getCanvasLabel,
  getViewer,
  getConfig,
  getCompanionWindowsForContent,
  getCurrentCanvasWorld,
} from '../state/selectors';

/**
 * Hooks-based replacement for the old connect()/compose(withPlugins()) container.
 * Builds the InfoResponseTileSource elements here (one per image resource)
 * and hands them down as a prop, so the presentational OpenSeadragonViewer
 * never has to import a container itself -- it just renders what it's given.
 */
function OpenSeadragonViewerContainer({ windowId, ...rest }) {
  const dispatch = useDispatch();

  const canvasWorld = useSelector((state) => getCurrentCanvasWorld(state, { windowId }));
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

  const imageResources = canvasWorld.canvases.flatMap((c) => c.iiifImageResources);

  return (
    <OpenSeadragonViewer
      {...rest}
      windowId={windowId}
      canvasWorld={canvasWorld}
      drawAnnotations={config.window.forceDrawAnnotations || hasAnnotationsCompanionWindow || hasSearchCompanionWindow}
      imageResources={imageResources}
      tileSources={imageResources.map((imageResource) => (
        <InfoResponseTileSource
          key={getIiifResourceImageService(imageResource).id}
          canvasWorld={canvasWorld}
          imageResource={imageResource}
        />
      ))}
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
