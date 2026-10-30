import PropTypes from 'prop-types';
import CanvasWorld from '../lib/CanvasWorld';
import TileSource from './OpenSeadragonTileSource';

/**
 * Renders one image resource's tile layer, once its info response has
 * successfully loaded. Pure presentation -- canvasWorld is used only for
 * its geometry/layering methods, the same way nonTiledImages' rendering
 * in OpenSeadragonViewer.jsx already does.
 */
export function InfoResponseTileSource({ canvasWorld, infoId, isSuccess, tileSource = undefined }) {
  if (!isSuccess) return null;

  const contentResource = canvasWorld.contentResource(infoId);
  if (!contentResource) return null;

  const fitBounds = canvasWorld.contentResourceToWorldCoordinates(contentResource);
  const index = canvasWorld.layerIndexOfImageResource(contentResource);
  const opacity = canvasWorld.layerOpacityOfImageResource(contentResource);

  return <TileSource tileSource={tileSource} fitBounds={fitBounds} index={index} opacity={opacity} />;
}

InfoResponseTileSource.propTypes = {
  canvasWorld: PropTypes.instanceOf(CanvasWorld).isRequired,
  infoId: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool.isRequired,

  tileSource: PropTypes.object,
};
