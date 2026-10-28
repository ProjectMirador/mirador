import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import { OpenSeadragonViewer } from '../components/OpenSeadragonViewer';
import * as actions from '../state/actions';
import { iiifApi, useGetInfoResponseQuery } from '../state/api/iiifApi';
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
 * Holds one getInfoResponse subscription open for exactly as long as it's
 * rendered. The parent mounts/unmounts one of these per currently-visible
 * image resource, so RTK Query's own subscriber-count lifecycle (refetch
 * while mounted, GC once nothing needs it) does the right thing with no
 * manual bookkeeping -- React hooks can't be called in a loop/map, but a
 * variable number of these as siblings is fine.
 */
function InfoResponseSubscription({ imageResource, infoId }) {
  useGetInfoResponseQuery({ imageResource, infoId });
  return null;
}

InfoResponseSubscription.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  imageResource: PropTypes.object.isRequired,
  infoId: PropTypes.string.isRequired,
};

/**
 * Hooks-based replacement for the old connect()/compose(withPlugins()) container.
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

  // Read straight from iiifApi's cache -- the InfoResponseSubscription
  // siblings below are what keep it populated/fresh; this is just a read.
  const infoResponses = useSelector((state) =>
    imageResources
      .map((imageResource) => {
        const infoId = getIiifResourceImageService(imageResource).id;
        return { ...iiifApi.endpoints.getInfoResponse.select({ infoId })(state), id: infoId };
      })
      .filter((infoResponse) => infoResponse.isSuccess),
  );

  return (
    <>
      {imageResources.map((imageResource) => {
        const infoId = getIiifResourceImageService(imageResource).id;
        return <InfoResponseSubscription key={infoId} imageResource={imageResource} infoId={infoId} />;
      })}
      <OpenSeadragonViewer
        {...rest}
        windowId={windowId}
        canvasWorld={canvasWorld}
        drawAnnotations={config.window.forceDrawAnnotations || hasAnnotationsCompanionWindow || hasSearchCompanionWindow}
        infoResponses={infoResponses}
        label={label}
        nonTiledImages={nonTiledImages}
        osdConfig={config.osdConfig}
        viewerConfig={viewerConfig}
        updateViewport={(...args) => dispatch(actions.updateViewport(...args))}
      />
    </>
  );
}

OpenSeadragonViewerContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default withPlugins('OpenSeadragonViewer')(OpenSeadragonViewerContainer);
