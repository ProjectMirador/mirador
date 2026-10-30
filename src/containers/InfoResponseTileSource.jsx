import PropTypes from 'prop-types';
import CanvasWorld from '../lib/CanvasWorld';
import { InfoResponseTileSource } from '../components/InfoResponseTileSource';
import { useGetInfoResponseQuery } from '../state/api/iiifApi';
import { getIiifResourceImageService } from '../lib/iiif';

/**
 * Hooks-based container: subscribes to one image resource's info response
 * via RTK Query and hands the result to the presentational component.
 * Mounting/unmounting this (driven by the parent re-rendering with a
 * different set of image resources on canvas switch) is what keeps the
 * subscription's lifecycle correct
 */
function InfoResponseTileSourceContainer({ canvasWorld, imageResource }) {
  const infoId = getIiifResourceImageService(imageResource).id;
  const { data, isSuccess } = useGetInfoResponseQuery({ imageResource, infoId });

  return <InfoResponseTileSource canvasWorld={canvasWorld} infoId={infoId} isSuccess={isSuccess} tileSource={data} />;
}

InfoResponseTileSourceContainer.propTypes = {
  canvasWorld: PropTypes.instanceOf(CanvasWorld).isRequired,

  imageResource: PropTypes.object.isRequired,
};

export default InfoResponseTileSourceContainer;
